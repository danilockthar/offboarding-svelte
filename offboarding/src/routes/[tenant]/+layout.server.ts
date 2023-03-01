import { error } from '@sveltejs/kit';
import { canUnsubscribe } from '../../services/canUnsubscribe';
import { getAccount } from '../../services/getAccount';
import { response_data } from '../../services/store';

export async function load({ params, fetch, url }: any) {
	const tenants = ['viumi'];
	if (!tenants.includes(params.tenant)) {
		throw error(404, 'Not found');
	}
	const pt_token = url.searchParams.get('token');
	if (!pt_token) {
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

	const account = await getAccount(pt_token);
	if (!account.ok) {
		throw error(403, 'Unauthorized');
	}
	const account_data = await account.json();
	if (!account_data.data?.id) {
		throw error(404, 'Account Not Found');
	}
	try {
		const response = await canUnsubscribe(account_data?.data?.id);
		const result = await response.json();
		return {
			tenant: params.tenant,
			response: result,
			config: data,
			account: account_data.data.id,
			token: pt_token
		};
	} catch (error) {
		const mockResponse = { message: 'error', status_code: 'PENDING_DEPOSIT' };
		return {
			tenant: params.tenant,
			response: mockResponse,
			config: data,
			account: account_data.data.id,
			token: pt_token
		};
	}
}
