import { obfuscate, skipStream } from '../../helpers/obfuscate';

describe('obfuscate utility', () => {
  it('replaces password with *****', () => {
    const data = obfuscate({ name: 'Julian', password: '123' });

    const expectedData = { name: 'Julian', password: '*****' };

    expect(data).toEqual(expectedData);
  });

  /*
  TODO: its not a new bug.
  it('replaces deeper password with *****', () => {
    const data = obfuscate({ deeper: { password: '123' } });

    const expectedData = { deeper: { password: '*****' } };

    expect(data).toEqual(expectedData);
  });
  */

  it('return an empty object if data has an _streams key', () => {
    const data = skipStream({
      someData: 1,
      _streams: {
        otherData: 2,
      },
    });

    expect(data).toEqual({});
  });

  it('return same object if lacks of an _streams key', () => {
    const data = skipStream({ someData: 1 });

    expect(data).toEqual({ someData: 1 });
  });
});