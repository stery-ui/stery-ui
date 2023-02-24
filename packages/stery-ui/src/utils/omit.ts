export function omit<T extends Record<any, any>>(
  object: T,
  keysToOmit: string[] = []
) {
  let clone = Object.assign({}, object);
  for (let key of keysToOmit) {
    if (key in clone) delete clone[key];
  }
  return clone;
}
