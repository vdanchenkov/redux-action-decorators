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
});
