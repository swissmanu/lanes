export default function updateInArray<T>(
  xs: ReadonlyArray<T>,
  predicate: (x: T) => boolean,
  y: T
): ReadonlyArray<T> {
  const index = xs.findIndex(predicate);
  if (index !== -1) {
    return [...xs.slice(0, index), y, ...xs.slice(index + 1)];
  }
  return xs;
}
