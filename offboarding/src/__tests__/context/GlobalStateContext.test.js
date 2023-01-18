import { renderHook } from '@testing-library/react-hooks';
import { useGlobalState } from '../../context/GlobalStateContext';

describe('GlobalStateContext', () => {
  test('it throws an error if useGlobalState is used outside of context', () => {
    const { result } = renderHook(() => useGlobalState());

    const expectedError = new Error(
      'useGlobalState must be used within a GlobalStateProvider',
    );

    expect(result.error).toEqual(expectedError);
  });
})