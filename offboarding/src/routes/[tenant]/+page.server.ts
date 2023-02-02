import { redirect, type LoadEvent, error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, cookies }: any) {
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
	cookies.set('response_', JSON.stringify({ message: '$900.000' }), {
		maxAge: 60 * 60 * 24 * 365,
		httpOnly: true,
		path: '/'
	});
	if (!res.ok) {
		throw redirect(301, '/viumi/pending-deposit');
	}
}
