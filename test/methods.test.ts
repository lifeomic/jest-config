test('has exposed some desired methods', () => {
  expect({
    numberVal: .31,
    otherNum: .3,
  }).toEqual({
    numberVal: expect.toBeCloseTo(0.3, 1),
    otherNum: expect.not.toBeCloseTo(0.2),
  });
  expect(.31).toBeCloseTo(0.3, 1);
  expect(.3).not.toBeCloseTo(0.2);
});
