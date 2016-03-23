import { default as decorator, factory } from './named';
import { expect } from 'chai';

describe('Named action creator factory', () => {
  it('creates action creator that have toString method returning first argument of the action creator', () => {
    expect(factory('test').toString()).to.be.eq('test');
  });
});
