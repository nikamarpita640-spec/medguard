// Thin helper that simulates network latency for mock services.
// Swap this out for a real fetch()/Supabase client call later — the
// function signatures in each service file are designed to stay the same,
// so pages and components never need to change when the backend goes live.
export function mockRequest(data, { delay = 350, failRate = 0 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failRate > 0 && Math.random() < failRate) {
        reject(new Error('Network request failed. Please try again.'));
        return;
      }
      resolve(typeof data === 'function' ? data() : data);
    }, delay);
  });
}
