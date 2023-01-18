import {
  constraintInputLength,
  onlyNumbers,
  onlyLettersAndSpaces
} from '../../helpers/constraints';

describe('input constraints', () => {
  test('it truncate string to provided length', () => {
    const event = {
      target: {
        value: '1a2 b3c@'
      },
    };

    constraintInputLength(event, 5);

    expect(event.target.value).toHaveLength(5);
    expect(event.target.value).toEqual('1a2 b');
  });

  test('it remove all character but numbers', () => {
    const event = {
      target: {
        value: '1a2 b3c@'
      },
    };

    onlyNumbers(event);

    expect(event.target.value).toBe('123');
  });

  test('it remove all character but letters and spaces', () => {
    const event = {
      target: {
        value: '1a2 b3c@'
      },
    };

    onlyLettersAndSpaces(event);

    expect(event.target.value).toBe('a bc');
  });

  test('it does not remove accent marks', () => {
    const accents = 'áéíóúü ÁÉÍÓÚÜ';

    const event = {
      target: {
        value: accents
      }
    }
    
    onlyLettersAndSpaces(event);

    expect(event.target.value).toEqual(accents);
  })
})