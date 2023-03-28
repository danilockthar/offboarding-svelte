import axios from 'axios';

const api = (baseURL: string, headers: any) => {
	const instance = axios.create({
		baseURL,
		headers: {
			'Content-Type': 'application/json',
			...headers
		}
	});

	instance.interceptors.request.use((request) => {
		const { method, url, data } = request;
		return request;
	});

	instance.interceptors.response.use(
		(response) => {
			const {
				status,
				data,
				config: { url }
			} = response;

			return response;
		},
		(error) => {
			const {
				message,
				config: { url },
				response: { data, status }
			} = error;

			console.error(
				'RESPONSE [ERROR] - ',
				JSON.stringify({
					message,
					status,
					url,
					data
				})
			);

			return Promise.reject(error);
		}
	);

	return instance;
};

export default api;
