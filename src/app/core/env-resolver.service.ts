import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {EMPTY, of} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';

import {SystemStoreFacadeService} from './store/system-store-facade.service';

@Injectable({
  providedIn: 'root',
})
export class EnvResolverService implements Resolve<unknown> {
  constructor(private readonly systemStoreService: SystemStoreFacadeService) {}

  resolve() {
    // console.log('env');
    return this.systemStoreService
      .getEnvConfig()
      .pipe(
        take(1),
        mergeMap(data => {
          if (data) {
            return of(data);
          } else {
            console.error('Environment config not found !');
            return EMPTY;
          }
        }),
      )
      .toPromise();
  }
}
