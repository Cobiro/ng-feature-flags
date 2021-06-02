import {Observable} from 'rxjs';
import {FeatureFlagsState} from '../core/application/feature-flags.state';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hasFeature',
})
export class HasFeaturePipe implements PipeTransform {
  constructor(private state: FeatureFlagsState) {}

  transform(flags: string[]): Observable<boolean> {
    return this.state.hasFlags(flags);
  }
}
