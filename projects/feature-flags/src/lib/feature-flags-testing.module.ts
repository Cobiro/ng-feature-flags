import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeatureFlagsState} from './core/application/feature-flags.state';
import {FeatureFlagsStateStub} from './core/application/feature-flags.state.stub';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: FeatureFlagsState,
      useClass: FeatureFlagsStateStub,
    },
  ],
})
export class FeaatureFlagsTestingModule {}
