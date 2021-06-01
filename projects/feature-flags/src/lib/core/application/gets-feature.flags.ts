import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface GetsFeatureFlags {
  getAll(): Observable<Set<string>>;
}

export const GETS_FEATURE_FLAGS = new InjectionToken<GetsFeatureFlags>('GETS_FEATURE_FLAGS');
