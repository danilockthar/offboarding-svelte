import taxIdentityDataAdapter from "../../../services/taxIdentity/taxIdentityDataAdapter";

describe('useTaxIdentity', () => {
  describe('dataAdapter', () => {
    it('returns an error when a person is not inscribed', () => {
      const data = taxIdentityDataAdapter(false, true, {
        statusCode: 404,
        error: "Not Found",
        message: "Register not found",
      });

      expect(data).toEqual({
        taxCondition: '-',
        taxConditionId: undefined,
        legalName: undefined,
        error: 'validation.fiscal_error',
      });
    });

    it('returns taxCategory 3 and monotribute label when is only a monotribute inscribed', () => {
      const data = taxIdentityDataAdapter(true, false, {
        denomination: "TEST",
        iva: "NI",
        monotributo: "H",
      });

      expect(data).toEqual({
        taxCondition: 'taxIdentity.monotribute.label',
        taxConditionId: 3,
        legalName: 'TEST',
        error: false,
      });
    });

    it('returns taxType label if is both monotribute and iva inscribed', () => {
      const data = taxIdentityDataAdapter(true, false, {
        denomination: "TEST",
        iva: "EX",
        monotributo: "H",
      });

      expect(data).toEqual({
        taxCondition: 'taxIdentity.exempt.label',
        taxConditionId: 3,
        legalName: 'TEST',
        error: false,
      });
    });

    it('returns corresponding label and name for AC iva taxType', () => {
      const data = taxIdentityDataAdapter(true, false, {
        denomination: "TEST",
        iva: "AC",
        monotributo: "NI",
      });

      expect(data).toEqual({
        taxCondition: 'taxIdentity.registeredManager.label',
        taxConditionId: 1,
        legalName: 'TEST',
        error: false,
      });
    });

    it('returns corresponding label and name for EX iva taxType', () => {
      const data = taxIdentityDataAdapter(true, false, {
        denomination: "TEST",
        iva: "EX",
        monotributo: "NI",
      });

      expect(data).toEqual({
        taxCondition: 'taxIdentity.exempt.label',
        taxConditionId: 2,
        legalName: 'TEST',
        error: false,
      });
    });

    it('returns corresponding label and name for XN iva taxType', () => {
      const data = taxIdentityDataAdapter(true, false, {
        denomination: "TEST",
        iva: "XN",
        monotributo: "NI",
      });

      expect(data).toEqual({
        taxCondition: 'taxIdentity.exempt.label',
        taxConditionId: 2,
        legalName: 'TEST',
        error: false,
      });
    });

    it('returns corresponding label and name for AN iva taxType', () => {
      const data = taxIdentityDataAdapter(true, false, {
        denomination: "TEST",
        iva: "AN",
        monotributo: "NI",
      });

      expect(data).toEqual({
        taxCondition: 'taxIdentity.exempt.label',
        taxConditionId: 2,
        legalName: 'TEST',
        error: false,
      });
    });

    it('returns corresponding label and name for NA iva taxType', () => {
      const data = taxIdentityDataAdapter(true, false, {
        denomination: "TEST",
        iva: "NA",
        monotributo: "NI",
      });

      expect(data).toEqual({
        taxCondition: 'taxIdentity.notReached.label',
        taxConditionId: 4,
        legalName: 'TEST',
        error: false,
      });
    });

    it('returns empty taxCondition and undefined taxConditionId if iva taxType does not exists', () => {
      const data = taxIdentityDataAdapter(true, false, {
        denomination: "TEST",
        iva: "THIS_IS_WRONG",
        monotributo: "NI",
      });

      expect(data).toEqual({
        taxCondition: '-',
        taxConditionId: undefined,
        legalName: 'TEST',
        error: false,
      });
    });

    it('returns empty taxCondition and undefined taxConditionId if is not monotribute or iva inscribed', () => {
      const data = taxIdentityDataAdapter(true, false, {
        denomination: "TEST",
        iva: "NI",
        monotributo: "NI",
      });

      expect(data).toEqual({
        taxCondition: '-',
        taxConditionId: undefined,
        legalName: 'TEST',
        error: false,
      });
    });

    it('returns empty taxCondition and undefined taxConditionId if no data is provided', () => {
      const data = taxIdentityDataAdapter(true, false, {});

      expect(data).toEqual({
        taxCondition: '-',
        taxConditionId: undefined,
        legalName: undefined,
        error: false,
      });
    });
  });
});