import emptyActionFactory from 'utils/emptyActionFactory';
import inherit from 'utils/inherit';

export default (factory = emptyActionFactory) => (type, ...rest) => {
  const actionCreator = factory(type, ...rest);
  const namedActionCreator = (...actionArgs) => actionCreator(...actionArgs);
  namedActionCreator.toString = () => type;
  return inherit(actionCreator, namedActionCreator);
}