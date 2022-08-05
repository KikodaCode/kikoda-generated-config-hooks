import { useContext } from 'react';
import context from './context';

/**
 * `useConfig` is a custom hook which returns the config object. It uses the `useContext` primitive
 * to access the the Backend context set up by `asyncWithConfigProvider`. As such you will still need to
 * use the `asyncWithConfigProvider` HOC at the root of your app to initialize the React SDK and populate the
 * context with `config`.
 *
 * @return the config object
 */
function useConfig<T>(): T {
  const { config } = useContext(context) as { config: T };

  return config;
}

export { useConfig };
