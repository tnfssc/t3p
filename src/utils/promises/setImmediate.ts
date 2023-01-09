export const setImmediatePromise = () => {
  return new Promise((resolve) => {
    setImmediate(resolve);
  });
};
