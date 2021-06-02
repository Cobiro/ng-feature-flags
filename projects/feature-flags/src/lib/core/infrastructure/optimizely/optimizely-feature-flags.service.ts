import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '@optimizely/optimizely-sdk';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {OPTIMIZELY_CLIENT} from './optimizely-factory-provider';
import {GetsFeatureFlags, UserContext} from '../../application/gets-feature.flags';

@Injectable()
export class OptimizelyFeatureFlagsService implements GetsFeatureFlags {
  constructor(
    @Inject(OPTIMIZELY_CLIENT) private optimizelyClient: Client,
  ) {}

  getAll(userContext: UserContext): Observable<Set<string>> {
    return fromPromise(this.optimizelyClient.onReady()).pipe(
      map(() => this.optimizelyClient.getEnabledFeatures(userContext.id, { email: userContext.email })),
      map(flags => new Set(flags)),
    );
  }
}
