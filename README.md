# jest-config
Shared Jest config utils etc.

## preset
Publish a preset file for jest. Jest [26](https://jestjs.io/docs/26.x/configuration#preset-string)  [27](https://jestjs.io/docs/configuration#preset-string)

```json
{
  "preset": "@lifeomic/jest-config"
}
```

Config was extracted from [lifeomic/typescript-tools](https://github.com/lifeomic/typescript-tools/blob/e38d833a27a04122856fbd5c939f2e26c9bd02d5/config/jest.js)

## expect enhancement
Matchers can be exposed at the root level.  The library needs to be imported at some level to work.

[Jest-extended setup instructions](https://github.com/jest-community/jest-extended#setup)

```json
{
  "setupFiles": ["@lifeomic/jest-config"]
}
```

OR 

```json
{
  "setupFilesAfterEnv": ["@lifeomic/jest-config"]
}
```

The project can also be imported inside internal setup/test files using a setup file.
`setup.ts`
```typescript
import ('@lifeomic/jest-config');
```

To get typescript to see the types, it has been necessary to include something in the `tsconfig.json`.

```json
{
  "include": [
    "setup.ts"
  ]
}
```

After importing, all matchers are now exposed at the root level, and can be not-ed.

```typescript
test('has exposed some desired methods', () => {
  expect({
    numberVal: .31,
    otherNum: .3,
  }).toEqual({
    numberVal: expect.toBeCloseTo(0.3, 1),
    otherNum: expect.not.toBeCloseTo(0.2),
  });
});
```
