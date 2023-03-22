export const unsubscribe = (
	token: string,
	account_id: string | number,
	api_domain: string,
	xtenant: string
) => {
	const headers = new Headers({
		'Content-Type': 'application/json',
		'X-Authentication-Token': token.trim(),
		'X-Tenant': xtenant
	});
	const raw = JSON.stringify({
		merchant_id: account_id,
		products: ['account']
	});

	const requestOptions = {
		method: 'POST',
		headers,
		body: raw,
		redirect: 'follow'
	};

	return fetch(
		api_domain + '/v1.0/Unsubscribe/',
		/**@ts-ignore */
		requestOptions
	);
};
