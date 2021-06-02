import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {GetsFeatureFlags, UserContext} from '../../application/gets-feature.flags';

@Injectable()
export class JsonFeatureFlagsService implements GetsFeatureFlags {
  constructor(
    private httpClient: HttpClient,
    @Inject(JSON_FEATURE_FLAG_URL) private url: string,
  ) {}

  getAll(userContext: UserContext): Observable<Set<string>> {
    return this.httpClient.get(this.url).pipe(
      map((response: {data: string[]}) => {
        return new Set(response.data);
      }),
    );
  }
}
export const JSON_FEATURE_FLAG_URL = new InjectionToken<string>('JSON_FEATURE_FLAG_URL');
