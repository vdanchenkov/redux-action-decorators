const emptyActionFactory = () => () => ({});

export default (factory) => (wrappedfactory = emptyActionFactory) => (...args) => {
  const wrappedActionCreator = wrappedfactory(...args);
  const actionCreator = factory(...args);
  const mergedCreator = (...actionArgs) => {
    const wrappedAction = wrappedActionCreator(...actionArgs);
    const action = actionCreator(...actionArgs);
    return {...wrappedAction, ...action};
  }
  Object.setPrototypeOf(mergedCreator, actionCreator);
  Object.setPrototypeOf(actionCreator, wrappedActionCreator);
  return mergedCreator;
};
