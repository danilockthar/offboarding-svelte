import { error } from '@sveltejs/kit';
import { response_data } from '../../services/store';

export async function load({ params, fetch }: any) {
	const tenants = ['viumi'];
	if (!tenants.includes(params.tenant)) {
		throw error(404, 'Not found');
	}
	const res = await fetch('http://api-macro.test.geopagos.com/api/v1.0/CanUnsubscribe/', {
		method: 'POST',
		body: JSON.stringify({ merchant_id: 52 }),
		headers: {
			'X-Authentication-Token':
				'pt_d24d2b9147fad36299cbdf24cab52e7dd11f6c0c0536442b4b91fb6d4d595200',
			'X-Tenant': 'macro'
		}
	});
	const mockResponse = { message: '$500.50', status: 'PENDING_DEPOSIT' };
	const config = await fetch(`/api/get-config`, {
		method: 'POST',
		body: JSON.stringify({ tenant: params.tenant }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	response_data.set(mockResponse);
	const { data } = await config.json();
	if (!res.ok) {
		return {
			tenant: params.tenant,
			response: mockResponse,
			config: data
		};
	}
}
