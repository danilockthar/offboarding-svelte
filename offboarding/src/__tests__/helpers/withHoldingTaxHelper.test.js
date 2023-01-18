import WithHoldingTaxHelper from '../../helpers/withHoldingTaxHelper';

describe('withHoldingTaxHelper', () => {
  it('all methods return initial value if no data is provided', () => {
    const withHoldingTaxHelper = new WithHoldingTaxHelper(undefined);

    expect(withHoldingTaxHelper.isExcluded()).toEqual(false);
    expect(withHoldingTaxHelper.isExempted()).toEqual(false);
    expect(withHoldingTaxHelper.isInscribed()).toEqual(true);
  });

  it('method isExcluded returns true if excluded key is true', () => {
    const witHoldingTaxHelper = new WithHoldingTaxHelper({ excluded: true });

    expect(witHoldingTaxHelper.isExcluded()).toEqual(true);
  });

  it('method isExcluded returns false if excluded key is true but category is 5', () => {
    const witHoldingTaxHelper = new WithHoldingTaxHelper({ excluded: true, category: 5 });

    expect(witHoldingTaxHelper.isExcluded()).toEqual(false);
  });

  it('method isExempt returns true if category is equal to 5', () => {
    const witHoldingTaxHelper = new WithHoldingTaxHelper({ category: 5 });

    expect(witHoldingTaxHelper.isExempted()).toEqual(true);
  });

  it('method isExempt returns false if category is not equal to 5', () => {
    const witHoldingTaxHelper = new WithHoldingTaxHelper({ category: 1 });

    expect(witHoldingTaxHelper.isExempted()).toEqual(false);
  });

  it('method isInscribed returns true if category is not equal to 3', () => {
    const witHoldingTaxHelper = new WithHoldingTaxHelper({ category: 1 });

    expect(witHoldingTaxHelper.isInscribed()).toEqual(true);
  });

  it('method isInscribed returns false if category correspond to exempt', () => {
    const witHoldingTaxHelper = new WithHoldingTaxHelper({ category: 5 });

    expect(witHoldingTaxHelper.isInscribed()).toEqual(false);
  });

  it('method isInscribed returns false if category is equal to 3', () => {
    const witHoldingTaxHelper = new WithHoldingTaxHelper({ category: 3 });

    expect(witHoldingTaxHelper.isInscribed()).toEqual(false);
  });
});