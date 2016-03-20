import decorator from 'utils/decorator';

export const factory = (type) => {
  const namedActionCreator = () => ({});
  namedActionCreator.toString = () => type;
  return namedActionCreator;
};

export default decorator(factory);
