import {TestBed} from '@angular/core/testing';
import {JSON_FEATURE_FLAG_URL, JsonFeatureFlagsService, jsonFeatureFlagsServiceFactory,} from './json-feature-flags.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('JsonFeatureFlagsService`', () => {
  let service: JsonFeatureFlagsService;
  let httpClient: HttpClient;

  describe('basic tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: HttpClient,
            useValue: {
              get: () => {
                return of({
                  'feature-a': true,
                  'feature-b': true,
                  'feature-c': true,
                  'feature-d': false,
                });
              },
            },
          },
          {
            provide: JSON_FEATURE_FLAG_URL,
            useValue: 'json-url',
          },
          {
            provide: JsonFeatureFlagsService,
            useFactory: jsonFeatureFlagsServiceFactory,
            deps: [HttpClient, JSON_FEATURE_FLAG_URL],
          },
        ],
      });
      service = TestBed.inject(JsonFeatureFlagsService);
      httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should call httpClient.get with correct path', () => {
      jest.spyOn(httpClient, 'get');
      service.getAll().subscribe();
      expect(httpClient.get).toHaveBeenCalledWith('json-url');
    });

    it('should get the flags json file', done => {
      service.getAll().subscribe(flags => {
        expect(flags.has('feature-a')).toBe(true);
        expect(flags.has('feature-b')).toBe(true);
        expect(flags.has('feature-c')).toBe(true);
        expect(flags.has('feature-d')).toBe(false);
        done();
      });
    });
  });
});
