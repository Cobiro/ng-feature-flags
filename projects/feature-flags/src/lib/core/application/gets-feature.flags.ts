import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export interface UserContext {
  id: string;
  email: string;
}

export interface GetsFeatureFlags {
  getAll(userContext: UserContext): Observable<Set<string>>;
}

export const GETS_FEATURE_FLAGS = new InjectionToken<GetsFeatureFlags>('GETS_FEATURE_FLAGS');
