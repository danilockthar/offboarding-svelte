export const getAccount = (token: string) => {
	const myHeaders = new Headers();
	myHeaders.append('X-Authentication-Token', token);
	myHeaders.append('Content-Type', 'application/json');

	/**@type {Record<string, any>} */
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};
	return fetch('https://api-macro.dev.geopagos.com/api/account/', requestOptions as RequestInit);
};
