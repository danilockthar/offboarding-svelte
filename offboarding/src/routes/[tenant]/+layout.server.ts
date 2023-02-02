import { goto } from '$app/navigation';
import type { LoadEvent } from '@sveltejs/kit';
import api from '../../services/fetcher';
export async function load({ params, fetch }: LoadEvent) {
	/* goto('/asd'); */
	return {
		tenant: params.tenant || null,
		token: params.token || null
	};
}
