export const getAccount = (token: string, api_domain: string) => {
	const myHeaders = new Headers();
	myHeaders.append('X-Authentication-Token', token);
	myHeaders.append('Content-Type', 'application/json');

	/**@type {Record<string, any>} */
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};
	return fetch(api_domain + '/account/', requestOptions as RequestInit);
};
