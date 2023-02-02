import type { LoadEvent } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, cookies }: any) {
	const response_data = JSON.parse(cookies.get('response_')) || null;

	const config = await fetch(`/api/get-config`, {
		method: 'POST',
		body: JSON.stringify({ tenant: params.tenant }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const data = await config.json();

	return {
		tenant: params.tenant || null,
		token: params.token || null,
		response_data,
		configs: data
	};
}
