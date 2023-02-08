import { error, redirect, type LoadEvent } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, cookies }: any) {
	let response_data;
	if (cookies.get('response_')) {
		response_data = JSON.parse(cookies.get('response_'));
	}
	if (!response_data) {
		throw error(404, {
			message: 'private route'
		});
	}
	const config = await fetch(`/api/get-config`, {
		method: 'POST',
		body: JSON.stringify({ tenant: params.tenant }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { data } = await config.json();

	if (!Object.keys(data).includes(params.page)) {
		throw error(404, {
			message: 'Page not found'
		});
	}

	return {
		tenant: params.tenant || null,
		token: params.token || null,
		response_data,
		configs: data
	};
}
