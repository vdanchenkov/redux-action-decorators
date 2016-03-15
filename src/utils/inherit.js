export default (parent, object) => {
  Object.setPrototypeOf(object, parent);
  return object;
}