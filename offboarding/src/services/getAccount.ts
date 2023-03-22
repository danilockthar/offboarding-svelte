export const getAccount = (token: string, api_domain: string, xtenant: string) => {
	const headers = new Headers({
		'Content-Type': 'application/json',
		'X-Authentication-Token': token.trim(),
		'X-Tenant': xtenant
	});

	/**@type {Record<string, any>} */
	const requestOptions = {
		method: 'GET',
		headers,
		redirect: 'follow'
	};
	return fetch(api_domain + '/account/', requestOptions as RequestInit);
};
