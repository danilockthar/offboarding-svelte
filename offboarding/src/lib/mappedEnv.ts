import { env } from '$env/dynamic/public';

export const mappedEnv = (tenant: string, env_name: string) => {
	const envMap: any = {
		viumi: {
			BACKEND_DOMAIN: env.PUBLIC_VIUMI_BACKEND_DOMAIN,
			DASHBOARD_URL: env.PUBLIC_VIUMI_DASHBOARD_URL
		}
	};

	return envMap[tenant][env_name];
};
