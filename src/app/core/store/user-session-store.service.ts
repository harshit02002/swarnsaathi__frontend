import {Inject, Injectable} from '@angular/core';
import {InMemoryStorageService, StorageService} from 'ngx-webstorage-service';

import {StoreKeys} from './store-keys.enum';
import {APPLICATION_STORE, APP_SESSION_STORE} from './store.interface';
import { User } from 'src/app/models/auth.model';

@Injectable()
export class UserSessionStoreService {
  constructor(
    @Inject(APPLICATION_STORE)
    private readonly localStore: StorageService,
    @Inject(APP_SESSION_STORE)
    private readonly sessionStore: StorageService,
    private readonly inMemoryStore: InMemoryStorageService,
  ) {}

  public saveAccessToken(token: string): boolean {
    this.localStore.set(StoreKeys.ACCESS_TOKEN_KEY, token);
    return true;
  }

  public getAccessToken(): string {
    return this.localStore.get(StoreKeys.ACCESS_TOKEN_KEY);
  }

  public removeAccessToken(): boolean {
    this.localStore.remove(StoreKeys.ACCESS_TOKEN_KEY);
    return true;
  }

  public saveRefreshToken(token: string): boolean {
    this.localStore.set(StoreKeys.REFRESH_TOKEN_KEY, token);
    return true;
  }

  public getRefreshToken(): string {
    return this.localStore.get(StoreKeys.REFRESH_TOKEN_KEY);
  }

  public removeRefreshToken(): boolean {
    this.localStore.remove(StoreKeys.REFRESH_TOKEN_KEY);
    return true;
  }

  public setUser(user: User): void {
    this.localStore.set(StoreKeys.USER_KEY, user);
  }

  public removeUser(): boolean {
    this.localStore.remove(StoreKeys.USER_KEY);
    return true;
  }

  public getUser(): User {
    return this.localStore.get(StoreKeys.USER_KEY);
  }

  public setUserEmail(email: string): void {
    this.sessionStore.set(StoreKeys.USER_EMAIL, email);
  }
  public getUserEmail(): string {
    return this.sessionStore.get(StoreKeys.USER_EMAIL);
  }

  public setRedirectUrl(url: string): void {
    this.sessionStore.set(StoreKeys.REDIRECT_URL, url);
  }
  public getRedirectUrl(): string {
    return this.sessionStore.get(StoreKeys.REDIRECT_URL);
  }

  public clearAll(): void {
    this.inMemoryStore.clear();
    this.localStore.clear();
    this.sessionStore.clear();
  }
}
