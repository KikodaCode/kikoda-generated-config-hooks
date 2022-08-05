import { loadConfig } from '../src';

describe('loadConfig', () => {
  it('is not undefined', () => {
    expect(loadConfig).toBeDefined();
  });
});
