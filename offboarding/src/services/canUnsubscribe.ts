export const canUnsubscribe = (account_id: number | string) => {
	const myHeaders = new Headers();
	myHeaders.append(
		'X-Authentication-Token',
		'pt_450df86130c0c317b5a1793fd0d6a1306d1d83373fc7478035335a1b2e54a4c9'
	);
	myHeaders.append('X-Tenant', 'macro');
	myHeaders.append('Content-Type', 'application/json');

	const raw = JSON.stringify({
		merchant_id: account_id
	});

	/**@type {Record<string, any>} */
	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	return fetch(
		'https://api-macro.dev.geopagos.com/api/v1.0/CanUnsubscribe/',
		requestOptions as RequestInit
	);
};
