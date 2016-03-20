import payloadCreatorFactory from 'utils/payloadCreatorFactory';
import decorator from 'utils/decorator';

const identity = (object) => object;

export const factory = (getAction, type, payloadCreator, metaCreator) => {
  const payloadBuilder = payloadCreatorFactory(payloadCreator || identity);
  const metaBuilder = metaCreator ? payloadCreatorFactory(metaCreator) : undefined;
  return (...args) => {
    const action = { ...getAction(...args)};
    action.payload = payloadBuilder(...args);
    if (metaBuilder) {
      action.meta = metaBuilder(...args);
    }
    return action;
  }
};

export default decorator(factory);
