import { redirect, type LoadEvent, error } from '@sveltejs/kit';

const statusPage: Record<string, any> = {
	OK: 'can-unsubscribe',
	HAS_BALANCE: 'has-balance',
	PENDING_DEPOSIT: 'pending-deposit',
	ERROR: 'service-unavailable'
};

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, cookies, setHeaders }: any) {
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
	const mockResponse = { message: 'a lot of money', status: 'PENDING_DEPOSIT' };

	if (!res.ok) {
		return {
			tenant: params.tenant,
			response: mockResponse
		};
		/* cookies.set('response_', JSON.stringify(mockResponse), {
			maxAge: 10,
			httpOnly: true,
			path: '/'
		});
		throw redirect(301, `/${params.tenant}/${statusPage[mockResponse.status]}`); */
	}
}
