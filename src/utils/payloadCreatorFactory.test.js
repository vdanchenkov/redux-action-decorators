import payloadCreatorFactory from './payloadCreatorFactory';
import { expect } from 'chai';

describe('payloadCreatorFactory', () => {
  it('returns identity if no arguments was passed', () => {
    expect(payloadCreatorFactory()('test')).to.be.eq('test');
  });

  it('returns first argument if function was passed', () => {
    const func = () => ({});
    expect(payloadCreatorFactory(func)).to.be.eq(func);
  });

  it('throws exception if incorrect argument was passed', () => {
    expect(() => payloadCreatorFactory('string')).to.throw();
    expect(() => payloadCreatorFactory(1)).to.throw();
    expect(() => payloadCreatorFactory({})).to.throw();
  });
});