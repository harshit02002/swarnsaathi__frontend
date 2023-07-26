import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';
import {UserSessionStoreService} from '../store/user-session-store.service';

@Injectable({
  providedIn: 'root',
})
export class SignupGuardService implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly store: UserSessionStoreService,
  ) {}
  canActivate(): Promise<boolean> | boolean {
    const token = this.checkForToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  private checkForToken() {
    return this.store.getAccessToken();
  }
}
