export const getDirectionTowards = (target, origin) => {
  return target.subtract(origin).normalize();
};
