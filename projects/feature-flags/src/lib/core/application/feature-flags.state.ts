import {Observable, ReplaySubject} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {GETS_FEATURE_FLAGS, GetsFeatureFlags} from './gets-feature.flags';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsState {
  private featureFlags: ReplaySubject<Set<string>> = new ReplaySubject(1);

  constructor(@Inject(GETS_FEATURE_FLAGS) private getsFeatureFlags: GetsFeatureFlags) {
    this._init();
  }

  private _init(): void {
    const userContext = {
      id: '00000000-0000-0000-0000-000000000000',
      email: 'email@cobiro.com'
    };
    this.getsFeatureFlags
      .getAll(userContext)
      .pipe(take(1))
      .subscribe((featureFlags: Set<string>) => {
        this.featureFlags.next(featureFlags);
      });
  }

  public hasFlags(flags: string[]): Observable<boolean> {
    return this.featureFlags.asObservable().pipe(
      map((featureFlags: Set<string>) => [...new Set(flags)].find(flag => !featureFlags.has(flag)) === undefined),
    );
  }
}
