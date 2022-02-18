import { Matchers } from 'expect/build/types';
import matchers from 'expect/build/matchers';

const invalidKeys = ['resolves', 'rejects', 'not'] as const;

export type InvalidKeys = typeof invalidKeys[number];
export type ValidKeys = keyof Omit<Matchers<any>, InvalidKeys>

type RootMatchers = {
  [key in ValidKeys]: Matchers<any>[key];
}

const rootMatchers = {} as RootMatchers;

Object.keys(matchers)
  .filter((name): name is ValidKeys => !invalidKeys.includes(name as InvalidKeys))
  .forEach((name) => {
    const matcher = matchers[name];
    rootMatchers[name] = matcher.bind({});
  });

expect.extend(rootMatchers);

declare global {
  namespace jest {
    interface Expect extends RootMatchers {}
    interface InverseAsymmetricMatchers extends RootMatchers {}
  }
}