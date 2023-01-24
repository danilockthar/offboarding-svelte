import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery } from 'react-query';

import API from '../../../api';
/* import getErrorMessage from "../../helpers/getErrorMessage"; */
import { useGlobalState } from '../../../context/GlobalStateContext';

const useUnsubscribe = () => {
  const { globalState, setGlobalState } = useGlobalState();
  /* PEGADA TOKEN
    const 
  
  */

  const { mutate, ...state } = useMutation(() => {
    return API().post(
      'https://9ld7gbp3tq.api.quickmocker.com/api/v1.0/Unsubscribe',
    );
  });

  const { isSuccess, isError, error, data } = state;
  React.useEffect(() => {
    if (!isSuccess) return;
    if (data?.data?.message) {
      setGlobalState({ requestNumber: data?.data?.message });
    }
  }, [isSuccess]);
  return {
    unsubscribe: mutate,
    ...state,
  };
};

export default useUnsubscribe;
