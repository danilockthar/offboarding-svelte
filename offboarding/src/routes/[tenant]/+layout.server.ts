import { error } from '@sveltejs/kit';
import { canUnsubscribe } from '../../services/canUnsubscribe';
import { getAccount } from '../../services/getAccount';
import { response_data } from '../../services/store';
import { secrets } from '$lib/server/secrets';
import { env } from '$env/dynamic/public';

export async function load({ params, fetch, url }: any) {
	const tenants = ['viumi'];
	const apiDomains: Record<string, any> = {
		viumi: env.PUBLIC_VIUMI_BACKEND_DOMAIN
	};

	const api_domain = apiDomains[params.tenant];

	if (!tenants.includes(params.tenant)) {
		throw error(404, 'Not Found');
	}
	const pt_token = url.searchParams.get('token');

	if (!pt_token) {
		throw error(403, 'You should provide a token');
	}

	const config = await fetch(`/api/get-config`, {
		method: 'POST',
		body: JSON.stringify({ tenant: params.tenant }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { data } = await config.json();

	const account = await getAccount(pt_token, api_domain);
	if (!account.ok) {
		return {
			tenant: params.tenant,
			response: { status_code: 'ERROR' },
			config: data
		};
		throw error(403, `You Are Unauthorized!|| ${api_domain}`);
	}

	const account_data = await account.json();

	if (!account_data.data?.id) {
		throw error(404, 'Account Not Found');
	}

	try {
		const response = await canUnsubscribe(pt_token, account_data?.data?.id, api_domain);
		if (!response.ok) {
			return {
				tenant: params.tenant,
				response: { status_code: 'ERROR' },
				config: data
			};
		}
		const result = await response.json();
		return {
			tenant: params.tenant,
			response: result,
			config: data,
			account: account_data.data.id,
			token: pt_token
		};
	} catch (error) {
		const mockResponse = { message: 'error', status_code: 'ERROR' };
		return {
			tenant: params.tenant,
			response: mockResponse,
			config: data,
			account: account_data.data.id,
			token: pt_token
		};
	}
}
