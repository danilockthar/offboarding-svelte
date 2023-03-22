import { env } from '$env/dynamic/private';
import util from 'util';

export const canUnsubscribe = async (
	token: string,
	account_id: number | string,
	api_domain: string,
	xtenant: string
) => {
	const headers = new Headers({
		'X-Authentication-Token': token.trim(),
		'X-Tenant': xtenant,
		'Content-Type': 'application/json'
	});
	const raw = JSON.stringify({
		merchant_id: account_id
	});

	/**@type {Record<string, any>} */
	const requestOptions = {
		method: 'POST',
		headers,
		body: raw
	};

	const request = await fetch(`${api_domain}/v1.0/CanUnsubscribe/`, requestOptions as RequestInit);
	/* console.log(util.inspect(request, { showHidden: false, depth: null, colors: true })); */
	return request;
};
