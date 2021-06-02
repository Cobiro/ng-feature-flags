import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureFlagsDirective} from './directives/feature-flags.directive';
import {JSON_FEATURE_FLAG_URL, JsonFeatureFlagsService} from './core/infrastructure/json/json-feature-flags.service';
import {GETS_FEATURE_FLAGS} from './core/application/gets-feature.flags';
import {FeatureFlagsState} from './core/application/feature-flags.state';
import {FeatureFlagGuard} from './guards/feature-flag.guard';
import {HttpClientModule} from '@angular/common/http';
import {HasFeaturePipe} from './pipes/has-feature.pipe';

@NgModule({
  declarations: [FeatureFlagsDirective, HasFeaturePipe],
  exports: [FeatureFlagsDirective, HasFeaturePipe],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: JSON_FEATURE_FLAG_URL,
      useValue: 'https://cobiro.s3-eu-west-1.amazonaws.com/v1/feature-flags/index.json'
    },
    {
      provide: GETS_FEATURE_FLAGS,
      useClass: JsonFeatureFlagsService
    },
    FeatureFlagGuard,
    FeatureFlagsState,
  ]
})
export class FeatureFlagsModule {
}
