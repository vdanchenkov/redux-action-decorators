import fsa from 'fsa';
import { expect } from 'chai';
import decoratorTest from 'utils/decorator.test';

describe('FSA action creator factory', () => {
  decoratorTest(fsa, ['SOME_ACTION_TYPE']);
  const factory = fsa();

  describe('creates action creator that', () => {
    it('puts identity of second argument to payload by default', () => {
      const action = factory('ACTION')('test');
      expect(action).to.be.eql({ payload: 'test' });
    });

    it('uses second argument as payload creator', () => {
      const action = factory('ACTION', (a, b) => a + b)(1, 3);
      expect(action).to.be.eql({ payload: 4 });
    });

    it('uses third argument as meta creator', () => {
      const action = factory('ACTION', () => null, x => x)('test');
      expect(action).to.be.eql({ payload: null, meta: 'test' });
    });
  })
});