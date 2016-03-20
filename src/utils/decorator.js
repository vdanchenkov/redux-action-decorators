import emptyActionFactory from 'utils/emptyActionFactory';
import inherit from './inherit';

export default (actionCreatorBuilder) => (factory = emptyActionFactory) => (...args) => {
  const deeperActionCreator = factory(...args);
  return inherit(deeperActionCreator, actionCreatorBuilder(deeperActionCreator, ...args));
}