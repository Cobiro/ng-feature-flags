import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Client } from '@optimizely/optimizely-sdk';

export interface OptimizelyUserContext {
  userId: string;
  email: string;
}

export interface GetsOptimizelyUserContext {
  get(): Observable<OptimizelyUserContext>;
}

export const GETS_OPTIMIZELY_USER_CONTEXT = new InjectionToken<Client>('GetsOptimizelyUserContext');
