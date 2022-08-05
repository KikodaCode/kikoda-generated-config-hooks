/* eslint-disable @typescript-eslint/no-explicit-any */

export async function loadConfig<T>(host: string): Promise<T> {
  const response = await fetch(`${host}/config-manifest.json`, { cache: 'no-store' });
  const json = await response.json();
  const config = `${host}/${json.files['config.json']}`;

  if (config) {
    const res = await fetch(config, { cache: 'force-cache' });
    const result = await res.json();

    return result;
  }

  return {} as T;
}
