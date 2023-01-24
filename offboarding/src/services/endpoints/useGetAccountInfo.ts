import {useQuery} from 'react-query';
import {useGlobalState} from 'src/context/GlobalStateContext';
import API from 'src/api';

interface Config {
  authenticationToken?: string | string[];
}

interface Response {
  data: {
    id: string;
    type: string;
    attributes: {
      fiscalId: string;
      identityVefification: {
        status: boolean;
      };
      accountId: string;
      userId: string;
    };
  };
}
const getToken = () => new URLSearchParams(window.location.search).get('token');

const useGetAccountInfo = (config?: Config) => {
  const { globalState, setGlobalState } = useGlobalState();

  const { data, isSuccess } = useQuery<Response>('getAccountInfo', async () => {
    const { configurationManager } = globalState;
    const baseUrl = configurationManager.get('API_DOMAIN');

    const isPrimaryToken = new RegExp(/pt_/gm).test(getToken());

    if (isPrimaryToken){
      const { data } = await API(baseUrl).get(
          configurationManager.get('account.user'),
          {
            headers: {
              'X-Authentication-Token': getToken(),
            },
          },
      );
      return data;
    }



    const response = await API(baseUrl).post(
        configurationManager.get('registrations.token'),
        {
          token: getToken(),
        },
    );
    setGlobalState({
      authenticationToken: response.data.token
    });

    const { data } = await API(baseUrl).get(
      configurationManager.get('account.user'),
      {
        headers: {
          'X-Authentication-Token': response.data.token,
        },
      },
    );
    return data;
  });

  return {
    data,
    isSuccess,
  };
};

export default useGetAccountInfo;
