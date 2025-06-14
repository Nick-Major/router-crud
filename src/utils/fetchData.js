async function fetchData(url, options = {}) {
  const controller = new AbortController();
  const timeout = options.timeout || 8000;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.message || `HTTP error ${response.status}`);
    }

    return response.status !== 204 ? await response.json() : null;
    
  } catch (error) {
    clearTimeout(timeoutId);
    return {
      error: error.name === 'AbortError' 
        ? 'Request timeout' 
        : error.message || 'Network error'
    };
  }
}

export default fetchData;