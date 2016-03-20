import decorator from 'utils/decorator';

export const factory = (getAction, type) => (...args) => {
  const action = getAction(...args);
  return ({ ...action, type });
}

export default decorator(factory);
