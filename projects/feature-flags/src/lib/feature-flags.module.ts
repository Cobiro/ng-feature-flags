import { InjectionToken, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagsDirective } from './directives/feature-flags.directive';
import { FeatureFlagsState } from './application/feature-flags.state';
import { GETS_FEATURE_FLAGS, GetsFeatureFlags } from './domain/gets-feature.flags';

@NgModule({
  declarations: [FeatureFlagsDirective],
  exports: [FeatureFlagsDirective],
  imports: [CommonModule],
})
export class FeatureFlagsModule {
  static forRoot(
    featureFlagsServiceFactory: (...args) => GetsFeatureFlags,
    factoryDeps?: Provider[] | InjectionToken<any>[],
  ): ModuleWithProviders<FeatureFlagsModule> {
    return {
      ngModule: FeatureFlagsModule,
      providers: [
        {
          provide: GETS_FEATURE_FLAGS,
          useFactory: featureFlagsServiceFactory,
          deps: factoryDeps || [],
        },
        FeatureFlagsState,
      ],
    };
  }
}
