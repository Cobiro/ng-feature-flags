import { TestBed } from '@angular/core/testing';
import {
  OptimizelyFeatureFlagsService,
  optimizelyFeatureFlagsServiceFactory,
} from './optimizely-feature-flags.service';
import { OPTIMIZELY_CLIENT } from './optimizely-factory-provider';
import { GETS_OPTIMIZELY_USER_CONTEXT, OptimizelyUserContext } from './optimizely-user-context';
import { of } from 'rxjs';

describe('OptimizelyFeatureFlagsService`', () => {
  let service: OptimizelyFeatureFlagsService;
  let optimizelyInstanceSpy;
  const userContext: OptimizelyUserContext = { userId: 'userId', email: 'test@test.com' };

  describe('basic tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: OPTIMIZELY_CLIENT,
            useValue: {
              onReady: () => Promise.resolve(null),
              getEnabledFeatures: () => ['feature-a', 'feature-b', 'feature-c'],
            },
          },
          {
            provide: GETS_OPTIMIZELY_USER_CONTEXT,
            useValue: {
              get: () => of(userContext),
            },
          },
          {
            provide: OptimizelyFeatureFlagsService,
            useFactory: optimizelyFeatureFlagsServiceFactory,
            deps: [OPTIMIZELY_CLIENT, GETS_OPTIMIZELY_USER_CONTEXT],
          },
        ],
      });
      service = TestBed.inject(OptimizelyFeatureFlagsService);
      optimizelyInstanceSpy = TestBed.inject(OPTIMIZELY_CLIENT);
      spyOn(optimizelyInstanceSpy, 'onReady');
      spyOn(optimizelyInstanceSpy, 'getEnabledFeatures');
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should get the flags from optimizely', done => {
      service.getAll().subscribe(flags => {
        expect(optimizelyInstanceSpy.onReady).toHaveBeenCalled();
        expect(optimizelyInstanceSpy.getEnabledFeatures).toHaveBeenCalledWith(userContext.userId, {
          email: userContext.email,
        });
        expect(flags.has('feature-a')).toBe(true);
        expect(flags.has('feature-b')).toBe(true);
        expect(flags.has('feature-c')).toBe(true);
        expect(flags.has('feature-d')).toBe(false);
        done();
      });
    });
  });
});
