import typed from 'typed';
import { expect } from 'chai';
import decoratorTest from 'utils/decorator.test';

describe('Typed action creator factory', () => {
  decoratorTest(typed, ['SOME_ACTION_TYPE']);

  describe('creates action creator that', () => {
    it('creates action with type field', () => {
      const factory = typed();
      const actionCreator = factory('INCREMENT');
      expect(actionCreator).to.be.a('function');
      expect(actionCreator()).to.be.eql({type: 'INCREMENT'})
    });
  });
});
