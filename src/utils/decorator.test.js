import { expect } from 'chai';
import decorator from './decorator';

describe('decorator() creates decorators that', () => {
  const a = () => {
    const ac = (x) => ({a: x});
    ac.y = 'y';
    return ac;
  };

  const b = () => {
    const ac = (x) => ({b: x});
    ac.z = 'z';
    return ac;
  };

  const decoratorA = decorator(a);

  it('if invoked with no arguments returns associated factory', () => {
    expect(decoratorA()).to.be.eq(a);
  });

  describe('if invoked with another factory returns merged factory that', () => {
    const mergedFactory = decoratorA(b);

    it('merges actions', () => {
      expect(mergedFactory()('test')).to.be.eql({a: 'test', b: 'test'})
    })


    it('returns action creator prototypically inherited from both action creators', () => {
      expect(mergedFactory().y).to.be.eq('y');
      expect(mergedFactory().z).to.be.eq('z');
    })
  });
});
