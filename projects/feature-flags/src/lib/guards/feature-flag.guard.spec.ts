import { FeatureFlagGuard, NoFeatureFlagForGuard } from './feature-flag.guard';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Data, Router, UrlTree } from '@angular/router';
import { FeatureFlagsState } from '../application/feature-flags.state';
import { FeaatureFlagsTestingModule } from '../feature-flags-testing.module';
import { of } from 'rxjs';

describe('FeatureFlagGuard', () => {
  let guard: FeatureFlagGuard;
  let featureFlagState: FeatureFlagsState;
  let router: Router;
  const stubRouteSnapshot = {
    data: { featureFlags: ['test-flag'] } as Data,
  } as ActivatedRouteSnapshot;

  const urlTree = new UrlTree();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeaatureFlagsTestingModule],
      providers: [{ provide: Router, useValue: { parseUrl: () => urlTree } }, FeatureFlagGuard],
    });
    guard = TestBed.inject(FeatureFlagGuard);
    featureFlagState = TestBed.inject(FeatureFlagsState);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should throw an error when no featureFlag property was set in the route definition', () => {
    const stubRouteSnapshotWithoutFlag = { data: {} };

    guard.canActivate(stubRouteSnapshotWithoutFlag as ActivatedRouteSnapshot).subscribe(active => {
      expect(active).toEqual(urlTree);
    });
  });

  it('should allow to active route when the flag is present', done => {
    guard.canActivate(stubRouteSnapshot).subscribe(isActive => {
      expect(isActive).toBe(true);
      done();
    });
  });

  it('should not allow to active route when the flag is not present', done => {
    jest.spyOn(featureFlagState, 'hasFlags').mockReturnValue(of(false));
    jest.spyOn(router, 'parseUrl');

    guard.canActivate(stubRouteSnapshot).subscribe(isActive => {
      expect(isActive).toEqual(urlTree);
      expect(router.parseUrl).toHaveBeenCalledWith('/');
      done();
    });
  });
});
