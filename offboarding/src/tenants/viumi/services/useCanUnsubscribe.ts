import React from 'react';
import API from '../../../api';
import { useMutation, useQuery } from 'react-query';
import { useGlobalState } from '../../../context/GlobalStateContext';

const useCanUnsubscribe = () => {
  const { globalState, setGlobalState } = useGlobalState();
  /* PEGADA TOKEN
    const 
  
  */

  const { mutate, ...state } = useMutation((token: string | string[]) => {
    return API().post(
      'https://api-macro.dev.geopagos.com/api/v1.0/CanUnsubscribe/',
      {
        merchant_id: '382',
      },
      {
        headers: {
          'X-Authentication-Token': token,
          'X-Tenant': 'macro',
        },
      },
    );
  });

  const { isSuccess, isError, error, data } = state;
  React.useEffect(() => {
    if (!isSuccess) return;
    /* if (data?.data?.message) {
          setGlobalState({ requestNumber: data?.data?.message });
        } */
  }, [isSuccess]);
  return {
    canUnsubscribe: mutate,
    ...state,
  };
};

export default useCanUnsubscribe;
