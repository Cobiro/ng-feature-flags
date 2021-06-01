import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { map, shareReplay, take } from 'rxjs/operators';
import {GETS_FEATURE_FLAGS, GetsFeatureFlags} from './gets-feature.flags';

@Injectable()
export class FeatureFlagsState {
  private featureFlags: BehaviorSubject<Set<string>> = new BehaviorSubject(new Set());
  private featureFlags$ = this.featureFlags.asObservable().pipe(shareReplay());

  constructor(@Inject(GETS_FEATURE_FLAGS) private getsFeatureFlags: GetsFeatureFlags) {
    this._init();
  }

  private _init(): void {
    this.getsFeatureFlags
      .getAll()
      .pipe(take(1))
      .subscribe((featureFlags: Set<string>) => {
        this.featureFlags.next(featureFlags);
      });
  }

  public hasFlags(flags: string[]): Observable<boolean> {
    return this.featureFlags$.pipe(
      map(featureFlags => {
        return flags.reduce((acc, key) => {
          return acc && featureFlags.has(key);
        }, true);
      }),
    );
  }
}
