import { createContext } from 'react';

const context = createContext({
  config: {},
});

const { Provider, Consumer } = context;
export { Provider, Consumer };
export default context;
