test('has exposed some desired methods', () => {
  expect({
    numberVal: .31,
  }).toEqual({
    numberVal: expect.expect('toBeCloseTo', 0.3, 1),
  });
  expect(.31).expect('toBeCloseTo', 0.3, 1);
});
