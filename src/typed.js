import decorator from 'utils/decorator';

export const factory = (type) => () => {
  return ({ type });
}

export default decorator(factory);
