import axios from 'axios';
import https from 'https';

// import { obfuscate, skipStream } from './helpers/obfuscate';

const api = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  instance.interceptors.request.use((request) => {
    const { method, url, data } = request;

    /*console.info('REQUEST - ', JSON.stringify({
      method,
      url,
      data: obfuscate(skipStream(data)),
    }));*/

    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      const {
        status,
        data,
        config: { url },
      } = response;

      // console.info('RESPONSE - ', JSON.stringify({ status, url, data }));

      return response;
    },
    (error) => {
      const {
        message,
        config: { url },
        response: { data, status },
      } = error;

      console.error(
        'RESPONSE [ERROR] - ',
        JSON.stringify({
          message,
          status,
          url,
          data,
        }),
      );

      return Promise.reject(error);
    },
  );

  return instance;
}

export default api;
