import fsa from 'fsa';
import typed from 'typed';
import named from 'named';
import { expect } from 'chai';
import { createAction as reduxActionsFactory } from 'redux-actions';

describe('tests from README.md', () => {
  it('replicate redux-action', () => {
    const createAction = fsa(typed());
    expect(createAction('increment')(1)).to.be.eql({ type: 'increment', payload: 1});
  });

  it('replicate redux-act', () => {
    const createAction = named(fsa(typed()));
    expect(createAction('increment')(1)).to.be.eql({type: 'increment', payload: 1});
    expect(createAction('increment').toString()).to.be.eq('increment');
  });

  // Not sure that we need this as a test
  it('compatible with redux-actions', () => {
    const createAction = named(reduxActionsFactory);
    expect(createAction('increment')(1)).to.be.eql({type: 'increment', payload: 1});
    expect(createAction('increment').toString()).to.be.eq('increment')
  });

  it('order of decorators application can be changed', () => {
    const createAction = typed(fsa(named(fsa())));
    expect(createAction('increment')(1)).to.be.eql({type: 'increment', payload: 1});
    expect(createAction('increment').toString()).to.be.eq('increment');
  });

  it('typed examples', () => {
    expect(typed()('increment')()).to.be.eql({ type: 'increment' });
  });

  it('fsa examples', () => {
    let actionCreator = fsa()();
    expect(actionCreator(1)).to.be.eql({payload: 1});

    actionCreator = fsa()(null, (todos, status) => ({todos, status}));
    expect(actionCreator(['todo'], true)).to.be.eql({
      payload: {
        todos: ['todo'],
        status: true,
      },
    });

    actionCreator = fsa()(null, (todos, status) => todos, (todos, status) => ({status}));
    expect(actionCreator(['todo'], true)).to.be.eql({
      payload: ['todo'],
      meta: {status: true},
    });
  });

  it('named examples', () => {
    let createAction = named(typed());
    const increment = createAction('increment');

    const handleActions = require('redux-actions').handleActions;

    const reducer = handleActions({
      [increment]: (state) => state + 1,
    });

    expect(reducer(1, increment())).to.be.eq(2)
  })
});
