import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {FeatureFlagsState} from '../core/application/feature-flags.state';

export class NoFeatureFlagForGuard extends Error {
  message = 'No feature flags was set for the FeatureFlagGuard';
  name = 'NO_FEATURE_FLAG_FOR_GUARD';
}
const REDIRECT_URL = '/';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(private featureFlagsState: FeatureFlagsState, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    if (!route.data.featureFlags || route.data.featureFlags.length === 0) {
      console.error(new NoFeatureFlagForGuard());

      return of(this.router.parseUrl(REDIRECT_URL));
    }

    return this.featureFlagsState.hasFlags(route.data.featureFlags).pipe(
      map(active => {
        return active ? true : this.router.parseUrl(REDIRECT_URL);
      }),
    );
  }
}
