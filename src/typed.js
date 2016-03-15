import emptyActionFactory from 'utils/emptyActionFactory';
import inherit from 'utils/inherit';

export default (factory = emptyActionFactory) => (type, ...rest) => {
  const actionCreator = factory(type, ...rest);
  return inherit(actionCreator, (...actionArgs) => {
    const action = actionCreator(...actionArgs);
    action.type = type;
    return action;
  });
};
