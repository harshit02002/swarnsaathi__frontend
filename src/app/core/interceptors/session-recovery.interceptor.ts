import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {UserSessionStoreService as StoreService} from '../store/user-session-store.service';
import {Router} from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { STATUS_CODE } from '../api/error-code';


@Injectable()
export class SessionRecoveryInterceptor implements HttpInterceptor {
  constructor(
    private readonly store: StoreService,
    private readonly router: Router,
    private readonly backendService: BackendService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-denylist, id-match
  private _refreshSubject: Subject<any> = new Subject<any>();

  private _ifTokenExpired() {
    this._refreshSubject.subscribe({
      complete: () => {
        this._refreshSubject = new Subject<any>(); // NOSONAR
      },
      error: () => {
        this._refreshSubject = new Subject<any>();
        this.router.navigate([
          '',
          {
            queryParams: {
              returnPath: this.router.url,
            },
          },
        ]);
      },
    });
    if (this._refreshSubject.observers.length === 1) {
      this.backendService
        .refreshToken()
        .subscribe(this._refreshSubject);
    }
    return this._refreshSubject
  }

  private _checkTokenExpiryErr(error: HttpErrorResponse): boolean {
    if(error.status && error.status === STATUS_CODE.UNAUTHORIZED && error?.error?.error?.message?.message === 'TokenExpired'){
      return true;
    }
    return false;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (
      req.url.endsWith('/token-refresh') ||
      req.url.endsWith('/verify-token')
    ) {
      return next.handle(req);
    } else {
      return next.handle(req).pipe(
        catchError((error, caught) => {
          if (error instanceof HttpErrorResponse) {
            if (this._checkTokenExpiryErr(error)) {
              return this._ifTokenExpired().pipe(
                switchMap(() => {
                  const updatedRequest = this.updateRequestAuthToken(req);
                  return next.handle(updatedRequest);
                }),
              );
            } else {
              return throwError(()=> new HttpErrorResponse({error}));
            }
          }
          return caught;
        }),
      );
    }
  }

  updateRequestAuthToken(req:HttpRequest<any>) {
    const authToken = this.store.getAccessToken();
    if (req.url.endsWith('/logout')) {
      req = req.clone({
        body: {refreshToken: this.store.getRefreshToken()},
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
    } else {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }
    return req;
  }
}
