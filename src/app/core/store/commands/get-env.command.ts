import {IAdapter} from '@core/api/adapters/i-adapter';
import {ApiService} from '@core/api/api.service';
import {GetAPICommand} from '@core/api/commands';

export class GetEnvCommand<T> extends GetAPICommand<T> {
  constructor(apiService: ApiService, adapter: IAdapter<T>) {
    super(apiService, adapter, `assets/json/environment.json`);
  }
}
