import type { LoadEvent } from '@sveltejs/kit';
import api from '../../services/fetcher';
export async function load({ params, fetch }: LoadEvent) {
	return {
		tenant: params.tenant || null,
		token: params.token || null
	};
}
