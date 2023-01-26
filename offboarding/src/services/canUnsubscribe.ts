import api from './fetcher';

export async function canUnsubscribe() {
	return await api('http://api-macro.test.geopagos.com/', {}).post(
		'/api/v1.0/CanUnsubscribe/',
		{
			merchant_id: 52
		},
		{
			headers: {
				'X-Authentication-Token':
					'pt_d24d2b9147fad36299cbdf24cab52e7dd11f6c0c0536442b4b91fb6d4d595200',
				'X-Tenant': 'macro'
			}
		}
	);
}
