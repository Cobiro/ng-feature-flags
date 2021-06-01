import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '@optimizely/optimizely-sdk';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, switchMap } from 'rxjs/operators';
import { OPTIMIZELY_CLIENT } from './optimizely-factory-provider';
import { GETS_OPTIMIZELY_USER_CONTEXT, GetsOptimizelyUserContext } from './optimizely-user-context';
import {GetsFeatureFlags} from '../../application/gets-feature.flags';

@Injectable()
export class OptimizelyFeatureFlagsService implements GetsFeatureFlags {
  constructor(
    @Inject(OPTIMIZELY_CLIENT) private optimizelyClient: Client,
    @Inject(GETS_OPTIMIZELY_USER_CONTEXT) private getsUserContext: GetsOptimizelyUserContext,
  ) {}

  getAll(): Observable<Set<string>> {
    return fromPromise(this.optimizelyClient.onReady()).pipe(
      switchMap(() => this.getsUserContext.get()),
      map(({ userId, email }) => this.optimizelyClient.getEnabledFeatures(userId, { email })),
      map(flags => new Set(flags)),
    );
  }
}

export const optimizelyFeatureFlagsServiceFactory = (
  client: Client,
  getsUserContext: GetsOptimizelyUserContext,
) => {
  return new OptimizelyFeatureFlagsService(client, getsUserContext);
};
