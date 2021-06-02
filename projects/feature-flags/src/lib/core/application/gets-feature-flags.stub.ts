import {of} from 'rxjs';
import {GetsFeatureFlags} from './gets-feature.flags';

export class GetsFeatureFlagsStub implements GetsFeatureFlags {
  getAll() {
    return of(new Set(['feature-a', 'feature-b', 'feature-c']));
  }
}
