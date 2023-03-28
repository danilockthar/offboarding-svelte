import { error, json } from '@sveltejs/kit';
import viumi from '../../../tenants/viumi/config.json';

export async function POST({ request }: { request: Request }) {
	const { tenant } = await request.json();
	const configs: Record<any, any> = {
		viumi
	};
	return new Response(
		JSON.stringify({
			data: configs[tenant]
		})
	);
}
