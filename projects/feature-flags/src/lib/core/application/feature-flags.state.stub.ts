import {Observable, of} from 'rxjs';

export class FeatureFlagsStateStub {

  hasFlags(flags: string[]): Observable<boolean> {
    return of(true);
  }
}
