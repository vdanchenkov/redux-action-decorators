import { default as decorator, factory } from './typed';
import { expect } from 'chai';

describe('Typed action creator factory', () => {
  describe('creates action creator that', () => {
    it('creates action with type field', () => {
      const actionCreator = factory('INCREMENT');
      expect(actionCreator).to.be.a('function');
      expect(actionCreator()).to.be.eql({type: 'INCREMENT'})
    });
  });
});
