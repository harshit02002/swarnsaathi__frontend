import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {get} from 'lodash';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {ErrToastSkipHeader} from 'src/app/const';
import {ToastrService} from 'src/app/services/toastr.service';
import {STATUS_CODE} from '../api/error-code';

const errorMsgConst = 'error.error.message.message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly toastrService: ToastrService) {}

  private _checkTokenExpiryErr(error: HttpErrorResponse): boolean {
    return (
      error.status &&
      error.status === STATUS_CODE.UNAUTHORIZED &&
      error.error &&
      error.error.error &&
      error.error.error.message &&
      error.error.error.message === 'TokenExpired'
    );
  }

  intercept(
    // sonarignore:start
    req: HttpRequest<any>,
    // sonarignore:end
    next: HttpHandler,
    // sonarignore:start
  ): Observable<HttpEvent<any>> {
    // sonarignore:end
    if (req.headers.has(ErrToastSkipHeader)) {
      const headers = req.headers.delete(ErrToastSkipHeader);
      return next.handle(req.clone({headers}));
    } else if (
      req.url.endsWith('/logout') ||
      req.url.endsWith('/token-refresh')
    ) {
      return next.handle(req);
    } else {
      return next.handle(req).pipe(
        catchError((error, caught) => {
          if (
            error instanceof HttpErrorResponse &&
            error?.error?.error?.statusCode === STATUS_CODE.UNPROCESSABLE_ENTITY
          ) {
            const errMsg = this.getErrMsg(error);
            this.toastrService.error(errMsg, 'Error');
          } else if (
            error instanceof HttpErrorResponse &&
            !this._checkTokenExpiryErr(error)
          ) {
            let errMsg = get(error, errorMsgConst);
            errMsg =
              errMsg ||
              get(
                error,
                'error.error.message',
                'Some error occured. Please try again.',
              );
            this.toastrService.error(errMsg, 'Error');
          } else {
            // Do nothing
          }
          throw error;
        }),
      );
    }
  }

  getErrMsg(err: HttpErrorResponse) {
    const errDetails =
      get(err, 'error.error.details') || get(err, 'error.error.message');
    let errMsg = '';
    if (Array.isArray(errDetails)) {
      errDetails.forEach(item => {
        if (errMsg) {
          errMsg = `${errMsg} \
          ${item.path} ${item.message}`;
        } else {
          errMsg = `${item.path} ${item.message}`;
        }
      });
    } else {
      errMsg = errDetails;
    }
    return errMsg;
  }
}
