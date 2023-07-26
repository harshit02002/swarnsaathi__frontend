import {APP_INITIALIZER, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {StoreModule} from './store/store.module';
import {ApiModule} from './api/api.module';
import {HttpInterceptorProviders} from './interceptors';
import {EnvResolverService} from './env-resolver.service';
import {EnsureModuleLoadedOnce} from './ensure-module-loaded-once';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule,
    ApiModule,
    RouterModule,
  ],
  exports: [StoreModule, ApiModule],
  providers: [
    HttpInterceptorProviders,
    EnvResolverService,
    {
      provide: APP_INITIALIZER,
      deps: [EnvResolverService],
      multi: true,
      useFactory: (envResolverService: EnvResolverService) => () =>
        envResolverService.resolve(),
    },
  ],
})
export class CoreModule extends EnsureModuleLoadedOnce {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
