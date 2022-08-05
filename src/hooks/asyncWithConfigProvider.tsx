/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React from 'react';
import { Provider } from './context';
import { loadConfig } from './loadConfig';

export interface ConfigProviderOptions<T> {
  host: string; // where to load config from eg. http://localhost:3000,
  config?: T; // optionally pass in the config object instead of loading it
}

export async function asyncWithConfigProvider<T>({ host, config }: ConfigProviderOptions<T>) {
  if (!!!config) config = await loadConfig(host);

  const ConfigProvider = ({ children }: { children: React.ReactElement }) => (
    <Provider value={{ config: config as T }}>{children}</Provider>
  );

  return ConfigProvider;
}
