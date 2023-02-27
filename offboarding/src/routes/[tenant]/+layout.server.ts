import { error } from '@sveltejs/kit';
import { response_data } from '../../services/store';

export async function load({ params, fetch }: any) {
	const tenants = ['viumi'];
	if (!tenants.includes(params.tenant)) {
		throw error(404, 'Not found');
	}
	const myHeaders = new Headers();
	myHeaders.append(
		'X-Authentication-Token',
		'pt_450df86130c0c317b5a1793fd0d6a1306d1d83373fc7478035335a1b2e54a4c9'
	);
	myHeaders.append('X-Tenant', 'macro');
	myHeaders.append('Content-Type', 'application/json');

	const raw = JSON.stringify({
		merchant_id: 388
	});

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	const config = await fetch(`/api/get-config`, {
		method: 'POST',
		body: JSON.stringify({ tenant: params.tenant }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const { data } = await config.json();
	try {
		const response = await fetch(
			'https://api-macro.dev.geopagos.com/api/v1.0/CanUnsubscribe/',
			requestOptions
		);
		const result = await response.json();
		return {
			tenant: params.tenant,
			response: result,
			config: data
		};
	} catch (error) {
		const mockResponse = { message: 'A LOT OF GUITA', status_code: 'PENDING_DEPOSIT' };
		return {
			tenant: params.tenant,
			response: mockResponse,
			config: data
		};
	}
	/* 	const res = await fetch('http://api-macro.dev.geopagos.com/api/v1.0/CanUnsubscribe/', {
		method: 'POST',
		body: JSON.stringify({ merchant_id: 388 }),
		headers: {
			'X-Authentication-Token':
				'pt_450df86130c0c317b5a1793fd0d6a1306d1d83373fc7478035335a1b2e54a4c9',
			'X-Tenant': 'macro'
		}
	}); */
	/* const mockResponse = { message: 'A LOT OF GUITA', status_code: 'PENDING_DEPOSIT' };
	const config = await fetch(`/api/get-config`, {
		method: 'POST',
		body: JSON.stringify({ tenant: params.tenant }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const { data } = await config.json();
	if (!res.ok) {
		return {
			tenant: params.tenant,
			response: mockResponse,
			config: data
		};
	} */

	/* const response = await res.json();
	return {
		tenant: params.tenant,
		response,
		config: data
	}; */
}
