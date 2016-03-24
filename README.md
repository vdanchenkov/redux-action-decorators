# Deprecated
Looks like I overengineered it.

# Redux Action Decorators

## Terminology

- Action - object containing the information to be send to the store. `dispatch(action)`
- Action creator - function that returns action. `dispatch(actionCreator('some data'))`
- Factory - function that returns action creator. Examples are createAction implementations from [redux-actions](https://github.com/acdlite/redux-actions) and [redux-act](https://github.com/pauldijou/redux-act#createactiondescription-payloadreducer-metareducer) `dispatch(factory()('some data'))` 
- Decorator - function that accepts a factory and returns new factory. `dispatch(decorator(factory)()('some data'))`

## Usage
This library provides composable decorators to build you own factory of action creators. It is focused solely on action creation. There is no plans to provide helpers to create reducers. Every decorator accepts optional factory to decorate and returns new factory. 

Factory similar to redux-actions:

    import { typed, fsa } from 'redux-action-decorators';
    const createAction = fsa(typed());
    const increment = createAction('increment'); 
    expect(increment(1)).to.be.eql({ type: 'increment', payload: 1});
         
Factory similar to redux-act if you want to use action creators as reference instead of separate text constants:
         
    import { types, fsa, named } 'redux-action-decorators';
    const createAction = named(fsa(typed()));
    expect(createAction('increment')(1)).to.be.eql({ type: 'increment', payload: 1 });
    expect(createAction('increment').toString()).to.be.eq('increment');
    
    // or 
    
    import { createAction as factory } from 'redux-actions';
    const createAction = named(factory);
    expect(createAction('increment')(1)).to.be.eql({ type: 'increment', payload: 1 });
    expect(createAction('increment').toString()).to.be.eq('increment');
         
Order of decorator application can be arbitrary in most cases.
 
    import { types, fsa, named } 'redux-action-decorators';
    const createAction = typed(fsa(named(fsa())));
    expect(createAction('increment')(1)).to.be.eql({ type: 'increment', payload: 1 });
    expect(createAction('increment').toString()).to.be.eq('increment');
  
## Decorators       
       
### typed
Adds type field to action

    expect(typed()('increment')()).to.be.eq({ type: 'increment' });
    
### fsa
Adds payload and meta to action. Second argument of action creator will be used as descriptor of payload action field. Third as descriptor of meta action field.
  
    let actionCreator = fsa()(); 
    expect(actionCreator(1)).to.be.eql({ payload: 1 });
    
    actionCreator = fsa()(null, (todos, status) => ({todos, status}));
    expect(actionCreator(['todo'], true)).to.be.eql({
      payload: {
        todos: ['todo'],
        status: true,
      },
    });

    actionCreator = fsa()(null, (todos, status) => todos, (todos, status) => ({ status }));
    expect(actionCreator2(['todo'], true)).to.be.eql({
      payload: ['todo'],
      meta: { status: true },
    });
    
### named
Add `toString()` method to the action creator returning first argument. It enables usage of action creator itself insted of action name constant.
 
    import { handleActions } from 'redux-actions';
    import { named, typed } from 'redux-action-decorators';
    
    let createAction = named(typed());
    const increment = createAction('increment');

    const reducer = handleActions({
      [increment]: (state) => state + 1,
    });

    expect(reducer(1, increment())).to.be.eq(2)