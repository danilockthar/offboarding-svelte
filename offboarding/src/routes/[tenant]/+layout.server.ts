import { error } from '@sveltejs/kit';
import { canUnsubscribe } from '../../services/canUnsubscribe';
import { getAccount } from '../../services/getAccount';
import { mappedEnv } from '$lib/mappedEnv';
import { isWebview } from '../../lib/isWebview';

export async function load({ params, fetch, url, request}: any) {
	const tenants = ['viumi'];


	const api_domain = mappedEnv(params.tenant, 'BACKEND_DOMAIN');
	const xtenant = mappedEnv(params.tenant, 'X_TENANT');

	const isWebView = isWebview(request.headers.get('user-agent'))

	if (!tenants.includes(params.tenant)) {
		throw error(404, 'Not Found');
	}
	const pt_token = url.searchParams.get('token');

	if (!pt_token) {
		throw error(403, 'You should provide a token');
	}

	/**Returns the partner pages and their components */
	const config = await fetch(`/api/get-config`, {
		method: 'POST',
		body: JSON.stringify({ tenant: params.tenant }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { data } = await config.json();

	/** Returns the account_id or merchant_id we use later  */
	const account = await getAccount(pt_token, api_domain, xtenant);
	if (!account.ok) {
		return {
			tenant: params.tenant,
			response: { status_code: 400 },
			config: data,
			isWebView
		};
		throw error(403, `You Are Unauthorized!|| ${api_domain}`);
	}

	const account_data = await account.json();

	if (!account_data.data?.id) {
		/**if account id doesnt exist it will fails */
		throw error(404, 'Account Not Found');
	}

	try {
		const response = await canUnsubscribe(pt_token, account_data?.data?.id, api_domain, xtenant);

		if (!response.ok) {
			return {
				tenant: params.tenant,
				response: { status_code: 400 },
				config: data,
				isWebView
			};
		}
		const result = await response.json();
		return {
			tenant: params.tenant,
			response: result,
			config: data,
			account: account_data.data.id,
			token: pt_token,
			isWebView
		};
	} catch (error) {
		const mockResponse = { message: 'error', status_code: 400 };
		return {
			tenant: params.tenant,
			response: mockResponse,
			config: data,
			account: account_data.data.id,
			token: pt_token,
			isWebView
		};
	}
}
