const emptyActionFactory = () => () => ({});

export default (factory) => (wrappedfactory = emptyActionFactory) => (...args) => {
  const wrappedActionCreator = wrappedfactory(...args);
  const actionCreator = factory(wrappedActionCreator, ...args);
  Object.setPrototypeOf(actionCreator, wrappedActionCreator);
  return actionCreator;
};
