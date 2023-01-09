export const setTimeoutPromise = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
