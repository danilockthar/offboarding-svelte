import Cuit from '../../../helpers/fiscalId/cuit';
import AccountType from '../../../helpers/AccountType';

describe('fiscalId - CUIT', () => {
  it('should trown an error if CUIT type is not valid', () => {
    expect(() => new Cuit(20268668757, 'invalid')).toThrow(
      'invalid cuit type (valid types: person, company, any)',
    );
  });

  it('a number should pass for a valid personal CUIT', () => {
    const cuit = new Cuit(20268668757, 'person');
    expect(cuit.isValid()).toEqual(true);
  });

  it('a string should pass for a valid personal CUIT', () => {
    const cuit = new Cuit('20268668757', 'person');
    expect(cuit.isValid()).toEqual(true);
  });

  it('a number should fail if has more than 11 digits', () => {
    const cuit = new Cuit(202686687578, 'person');
    expect(cuit.isValid()).toEqual(false);
  });

  it('a number should fail if has less than 11 digits', () => {
    const cuit = new Cuit(2026866875, 'person');
    expect(cuit.isValid()).toEqual(false);
  });

  it('a number should pass if verification digit is 0', () => {
    const cuit = new Cuit(20319708570, 'person');
    expect(cuit.isValid()).toEqual(true);
  });

  it('a company number should fail if type is set to person', () => {
    const cuit = new Cuit(30712455655, 'person');
    expect(cuit.isValid()).toEqual(false);
  });

  it('a number should pass for a valid company CUIT', () => {
    const cuit = new Cuit(30712455655, 'company');
    expect(cuit.isValid()).toEqual(true);
  });

  it('a company number should pass for a valid any CUIT', () => {
    const cuit = new Cuit(30712455655, 'any');
    expect(cuit.isValid()).toEqual(true);
  });

  it('a personal number should pass for a valid any CUIT', () => {
    const cuit = new Cuit(20268668757, 'any');
    expect(cuit.isValid()).toEqual(true);
  });

  it('a company number should fail for a valid person CUIT', () => {
    const cuit = new Cuit(30712455655, 'person');
    expect(cuit.isValid()).toEqual(false);
  });

  it('a person number should fail for a valid company CUIT', () => {
    const cuit = new Cuit(20268668757, 'company');
    expect(cuit.isValid()).toEqual(false);
  });

  it('a number should fail is verification number is not correct', () => {
    const cuit = new Cuit(20268668758, 'person');
    expect(cuit.isValid()).toEqual(false);
  });

  it('a number will be sanitized', () => {
    const cuit = new Cuit('20-26866875-8', 'person');
    expect(cuit.getSanitizedNumber()).toEqual('20268668758');
  });

  it('generates a CUIT for a woman', () => {
    expect(Cuit.generate('38148622', 'F', 'person')).toEqual('27381486228');
  });

  it('generates a CUIT for a men', () => {
    expect(Cuit.generate('38148623', 'M', 'person')).toEqual('20381486231');
  });

  it('generates a CUIT for a company', () => {
    expect(Cuit.generate('71245565', null, 'company')).toEqual('30712455655');
  });

  it('generates a CUIT for a documetNumber with less than 8 digits', () => {
    expect(Cuit.generate('571796', 'M', 'person')).toEqual('20005717966');
  });

  it('convert account type corresponding into cuit type', () => {
    expect(Cuit.getType(AccountType.occasional())).toEqual('person');
    expect(Cuit.getType(AccountType.professional())).toEqual('person');
    expect(Cuit.getType(AccountType.company())).toEqual('company');
  });

  it('return invalid if no number is provided', () => {
    const cuit = new Cuit(null, 'person');
    expect(cuit.isValid()).toEqual(false);
  });

  it('should return correct document number from valid cuit', () => {
    const cuit = new Cuit(20268668757, 'person');
    expect(cuit.getDocumentNumber()).toEqual(26866875);
  });
});
