import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetsFeatureFlags } from '../../domain/gets-feature.flags';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JsonFeatureFlagsService implements GetsFeatureFlags {
  constructor(
    private _httpClient: HttpClient,
    @Inject(JSON_FEATURE_FLAG_URL) private _url: string,
  ) {}

  getAll(): Observable<Set<string>> {
    return this._httpClient.get(this._url).pipe(
      map(json => {
        return new Set(Object.keys(json).filter(key => json[key]));
      }),
    );
  }
}
export const JSON_FEATURE_FLAG_URL = new InjectionToken<string>('JSON_FEATURE_FLAG_URL');

export const jsonFeatureFlagsServiceFactory = (client: HttpClient, url: string) => {
  return new JsonFeatureFlagsService(client, url);
};
