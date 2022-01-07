/// <reference types="jest" />

import { Matchers } from 'expect/build/types';
import matchers from 'expect/build/matchers';

export type ValidKeys = keyof Omit<Matchers<any>, 'resolves' | 'rejects' | 'not'>
export type Args<Matcher extends ValidKeys> = Parameters<Matchers<any>[Matcher]>;

expect.extend({
  expect: <Matcher extends ValidKeys>(actual: unknown, matcher: Matcher, ...args: Args<Matcher>) => {
    const asMatcher = matchers[matcher];
    return asMatcher.call({}, actual, ...args);
  },
});

export type Matcherfunc<R = any> = <Matcher extends ValidKeys>(
  matcher: Matcher,
  expected?: Args<Matcher>[0],
  options?: Args<Matcher>[1],
) => R;

declare global {
  namespace jest {
    interface Matchers<R> {
      expect: Matcherfunc<R>;
    }
    interface Expect {
      expect: Matcherfunc;
    }
  }
}
