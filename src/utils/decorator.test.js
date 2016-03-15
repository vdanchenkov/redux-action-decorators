import { expect } from 'chai';

export default (decorator, args) => {
  it('calls action creator of wrapped factory and uses it to build action', () => {
    const factory = () => () => ({ testField: true });
    expect(decorator(factory)(...args)()).to.include({ testField: true})
  });

  it('can be called without arguments', () => {
    expect(decorator()(...args)()).to.be.a('object');
  });

  // TODO
  it('should not modify original factory', () => {
    let factory = Object.freeze(() => () => ({}));
    decorator(factory)(...args)();
  });

  it('prototypicaly inherits it\'s action creator from wrapped factory\'s action creator', () => {
    let ac;
    const factory = () => {
      const creator = () => ({ testField: true });
      ac = creator;
      creator.func = () => 'result';
      return creator;
    };
    const newFactory = decorator(factory);
    const actionCreator = newFactory();
    expect(actionCreator.func()).to.be.eq('result');
    expect(Object.getPrototypeOf(actionCreator)).to.be.eq(ac);
  });
}
