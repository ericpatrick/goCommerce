import Helpers from 'helpers';

describe('Testing helpers', () => {
  it('currency format', () => {
    expect(Helpers.getCurrency(10)).toBe('$10.00');
  });
});
