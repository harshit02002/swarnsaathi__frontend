import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {cloneDeep} from 'lodash';
import {InMemoryStorageService} from 'ngx-webstorage-service';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
import { AuthTokenSkipHeader } from 'src/app/const';

import {AnyAdapter} from '../api/adapters/any-adapter.service';
import {ApiService} from '../api/api.service';
import {GetEnvCommand} from './commands/get-env.command';
import {StoreKeys} from './store-keys.enum';

@Injectable()
export class SystemStoreFacadeService {
  constructor(
    private readonly inMemoryStore: InMemoryStorageService,
    private readonly anyAdapter: AnyAdapter,
    private readonly apiService: ApiService,
  ) {}

  getEnvConfig(reset = false) {
    const envInStore:(typeof environment) = this.inMemoryStore.get(StoreKeys.ENV_CONFIG);
    if (!reset && envInStore) {
      // Object.keys(envInStore).forEach(key => {
      // });
      // environment.clientId = envInStore.clientId;
      // environment.production = envInStore.production;
      // environment.publicKey = envInStore.publicKey,
      // environment.pubnubSubscribeKey = envInStore.pubnubSubscribeKey;
      // environment.userFacadeUrl = envInStore.userFacadeUrl;
      // environment.orgId = envInStore.orgId;
      return of(cloneDeep(envInStore));
    } else {
      const command: GetEnvCommand<typeof environment> = new GetEnvCommand(
        this.apiService,
        this.anyAdapter,
      );
      command.parameters = {
        headers: new HttpHeaders().set(AuthTokenSkipHeader, ''),
      };
      return command.execute().pipe(
        tap(data => {
          // Object.keys(data).forEach(key => {
          // });
          // environment.clientId = data.clientId;
          // environment.production = data.production;
          // environment.publicKey = data.publicKey,
          // environment.pubnubSubscribeKey = data.pubnubSubscribeKey;
          // environment.userFacadeUrl = data.userFacadeUrl;
          // environment.orgId = data.orgId;
          this.inMemoryStore.set(StoreKeys.ENV_CONFIG, cloneDeep(data));
        }),
      );
    }
  }

  clearAll() {
    this.inMemoryStore.remove(StoreKeys.ENV_CONFIG);
  }
}
