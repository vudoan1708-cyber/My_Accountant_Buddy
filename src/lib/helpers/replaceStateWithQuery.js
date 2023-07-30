export const replaceStateWithQuery = (/** @type {Record<string, string>} */ values) => {
  const url = new URL(window.location.toString());
  for (let [k, v] of Object.entries(values)) {
    if (v) {
      url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v));
    } else {
      url.searchParams.delete(k);
    }
  }
  history.replaceState({}, '', url);
};
