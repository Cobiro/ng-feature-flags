import {FeatureFlagsState} from './feature-flags.state';
import {GETS_FEATURE_FLAGS, GetsFeatureFlags} from '../domain/gets-feature.flags';
import {TestBed} from '@angular/core/testing';
import {GetsFeatureFlagsStub} from '../domain/gets-feature-flags.stub';

describe('Feature Flags State', () => {
  let state: FeatureFlagsState;
  let service: GetsFeatureFlags;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GETS_FEATURE_FLAGS,
          useClass: GetsFeatureFlagsStub,
        },
        FeatureFlagsState,
      ],
    });
    state = TestBed.inject(FeatureFlagsState);
    service = TestBed.inject(GETS_FEATURE_FLAGS);
  });

  it('should create', () => {
    expect(state).toBeTruthy();
  });

  it('should load feature flags initially', done => {
    state.hasFlags(['feature-a']).subscribe(hasFlag => {
      expect(hasFlag).toBe(true);
      done();
    });
  });

  it('should check multiple flags', done => {
    state.hasFlags(['feature-a', 'feature-b']).subscribe(canActivate => {
      expect(canActivate).toBe(true);
      done();
    });
  });

  it('should return false when does not have one of two flags', done => {
    state.hasFlags(['feature-a', 'feature-d']).subscribe(canActivate => {
      expect(canActivate).toBe(false);
      done();
    });
  });
});
