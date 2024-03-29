import { Matchers } from 'expect';
import matchers from 'expect/build/matchers';

const invalidKeys = ['resolves', 'rejects', 'not'] as const;

export type InvalidKeys = typeof invalidKeys[number];
type InvalidMatchersKeys = keyof Omit<typeof matchers, InvalidKeys>;
export type ValidKeys = keyof Omit<Matchers<any>, InvalidKeys>

type RootMatchers = {
  [key in ValidKeys]: Matchers<any>[key];
}

const rootMatchers = {} as RootMatchers;
const keys = Object.keys(matchers) as (keyof Matchers<any>)[];

keys
  .filter((name): name is ValidKeys => !invalidKeys.includes(name as InvalidKeys))
  .forEach((name) => {
    const matcher = matchers[name as InvalidMatchersKeys];
    // @ts-expect-error Can't match everything correctly
    rootMatchers[name] = matcher.bind({ customTesters: [] });
  });

expect.extend(rootMatchers);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Expect extends RootMatchers {}
    interface InverseAsymmetricMatchers extends RootMatchers {}
  }
}
