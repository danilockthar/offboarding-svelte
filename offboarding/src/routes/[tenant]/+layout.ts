import type { LoadEvent } from '@sveltejs/kit';

export function load({ params, fetch }: LoadEvent) {
	return {
		tenant: params.tenant || null
	};
}
