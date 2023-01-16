import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import API from '../../../api';
import { useGlobalState } from '../../../context/GlobalStateContext';

const useGetStatus = (token: string | string[]) => {
  const { globalState } = useGlobalState();
  /* PEGADA TOKEN
    const 
  
  */

  const query = useQuery<Record<string, any>, AxiosError>('unsubscribe', () => {
    const { configurationManager } = globalState;
    const baseUrl = configurationManager.get('API_DOMAIN');
    return API().post(
      'https://9ld7gbp3tq.api.quickmocker.com/api/v1.0/CanUnsubscribe',
    );
    /* return API(baseUrl).get(`/unsubscribe/validate?merchantId=XXXXXXXXX`); */
  });

  return {
    ...query,
  };
};

export default useGetStatus;
