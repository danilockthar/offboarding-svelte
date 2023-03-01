import { error } from '@sveltejs/kit';
import { canUnsubscribe } from '../../services/canUnsubscribe';
import { response_data } from '../../services/store';

export async function load({ params, fetch }: any) {
	const tenants = ['viumi'];
	if (!tenants.includes(params.tenant)) {
		throw error(404, 'Not found');
	}

	const config = await fetch(`/api/get-config`, {
		method: 'POST',
		body: JSON.stringify({ tenant: params.tenant }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const { data } = await config.json();
	try {
		const response = await canUnsubscribe();
		const result = await response.json();
		return {
			tenant: params.tenant,
			response: result,
			config: data
		};
	} catch (error) {
		const mockResponse = { message: 'error', status_code: 'PENDING_DEPOSIT' };
		return {
			tenant: params.tenant,
			response: mockResponse,
			config: data
		};
	}
}
