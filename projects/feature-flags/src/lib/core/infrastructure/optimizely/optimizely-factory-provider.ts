import { Client, createInstance, setLogLevel } from '@optimizely/optimizely-sdk';
import { InjectionToken } from '@angular/core';
import { EnvConfig } from '../../../../../../../projects/cobiro-core/src/lib/env-config.service';
import { environment } from '../../../../../../../environments/environment';
import { LogLevel } from '@optimizely/js-sdk-logging';

export const optimizelyFactoryProvider = (envConfig: EnvConfig): Client => {
  setLogLevel(environment.production ? LogLevel.ERROR : LogLevel.INFO);
  return createInstance({
    sdkKey: envConfig.keys.get('optimizely'),
    datafileOptions: {
      urlTemplate: `${envConfig.services.optimizely.url}/%s.json?v=${new Date().getTime()}`,
    },
  });
};

export const OPTIMIZELY_CLIENT = new InjectionToken<Client>('OptimizelyClient');
