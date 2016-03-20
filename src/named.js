import decorator from 'utils/decorator';

export const factory = (getAction, type) => {
  const namedActionCreator = (...args) => getAction(...args);
  namedActionCreator.toString = () => type;
  return namedActionCreator;
};

export default decorator(factory);
