import { env } from '$env/dynamic/private';

export const canUnsubscribe = (token: string, account_id: number | string, api_domain: string) => {
	const myHeaders = new Headers();
	myHeaders.append('X-Authentication-Token', token);
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

	return fetch(`${api_domain}/v1.0/CanUnsubscribe/`, requestOptions as RequestInit);
};
