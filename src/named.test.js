import named from './named';
import { expect } from 'chai';
import decoratorTest from './utils/decorator.test';

describe('Named action creator factory', () => {
  decoratorTest(named, ['SOME_ACTION_TYPE']);
});
