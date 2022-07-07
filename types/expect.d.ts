declare module 'expect/build/matchers' {
  import { Matchers } from 'expect';
  type BuildMatchers = {
    [key in keyof Matchers<any>]: Matchers<any>[key];
  }
  const matchers: BuildMatchers;
  export = matchers;
}
