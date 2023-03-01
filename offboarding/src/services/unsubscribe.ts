export const unsubscribe = (token: string, account_id: string | number) => {
	const myHeaders = new Headers();
	myHeaders.append('X-Authentication-Token', token);
	myHeaders.append('Content-Type', 'application/json');

	const raw = JSON.stringify({
		merchant_id: account_id,
		products: ['account']
	});

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	return fetch(
		'https://api-macro.dev.geopagos.com/api/v1.0/Unsubscribe/',
		/**@ts-ignore */
		requestOptions
	);
};
