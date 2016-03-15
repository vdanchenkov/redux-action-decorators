# Terminology

- Action - object containing the information to be send to the store. `dispatch(action)`
- Action creator - function that returns action. `dispatch(actionCreator('some data'))`
- Factory - function that returns action creator. We could call it action creator creator. One example is createAction from [redux-actions](https://github.com/acdlite/redux-actions) `dispatch(factory()('some data'))`
- Decorator - function that accepts a factory and returns new factory. `dispatch(decorator(factory)()('some data'))`

# Usage
This library provides composable decorators to build you own action creator factory similar to createAction of [redux-actions](https://github.com/acdlite/redux-actions#user-content-createactiontype-payloadcreator--identity-metacreator) or [redux-act](https://github.com/pauldijou/redux-act#createactiondescription-payloadreducer-metareducer). This library is focused solely on action creation. It will not provide helpers to create reducers. 

This is how you replicate functionality of redux-actions:

    import { typed, fsa } from 'redux-action-creators';
    const createAction = fsa(typed());
    expect(createAction('increment')(1)).to.be.eql({ type: 'increment', payload: 1});
         
This is how to build something similar to redux-act if you want to use action creators as reference in reducers:
         
    import { types, fsa, named } 'redux-action-creators';
    const createAction = named(fsa(typed()));
    expect(createAction('increment')(1)).to.be.eql({type: 'increment', payload: 1});
    expect(createAction('increment').toString()).to.be.eq('increment');
    
    // or 
    
    import { createAction as factory } from 'redux-actions';
    const createAction = named(factory);
    expect(createAction('increment')(1)).to.be.eql({type: 'increment', payload: 1});
    expect(createAction('increment').toString()).to.be.eq('increment');
         
Order of decorators application can be changed
 
    import { types, fsa, named } 'redux-action-creators';
    const createAction = typed(fsa(named(fsa())));
    expect(createAction('increment')(1)).to.be.eql({type: 'increment', payload: 1});
    expect(createAction('increment').toString()).to.be.eq('increment');
  
Factory accepts one optional argument - another factory to decorate. If factory was provided it will be used to create underlying action creator that we will be used to create base action to be extended by current decorator.     
