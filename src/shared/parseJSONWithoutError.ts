const parseJSONWithoutError = <T = Record<string, unknown>>(value: unknown): null | T => {
  if (value === null || value === undefined) return null;

  if (typeof value === 'string') {
    try {
      const json = JSON.parse(value);
      // return typeof json === 'object' && json !== null ? (json as T) : String(json);
      return typeof json === 'object' && json !== null ? (json as T) : null;
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // return value;
      return null;
    }
  }

  // if (Array.isArray(value)) return String(value);

  // if (typeof value === 'object') return value as T;

  return null;
};

export { parseJSONWithoutError };
