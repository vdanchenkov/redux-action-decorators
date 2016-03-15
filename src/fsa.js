import emptyActionFactory from 'utils/emptyActionFactory';
import payloadCreatorFactory from 'utils/payloadCreatorFactory';
import inherit from 'utils/inherit';

const identity = (object) => object;

export default (factory = emptyActionFactory) => (...args) => {
  const [type, payloadCreator, metaCreator] = args;
  const payloadBuilder = payloadCreatorFactory(payloadCreator || identity);
  const metaBuilder = metaCreator ? payloadCreatorFactory(metaCreator) : undefined;
  const actionCreator = factory(...args);
  return inherit(actionCreator, (...actionArgs) => {
    const action = actionCreator();
    action.payload = payloadBuilder(...actionArgs);
    if (metaBuilder) {
      action.meta = metaBuilder(...actionArgs);
    }
    return action;
  });
}