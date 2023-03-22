import { env } from '$env/dynamic/public';

export const mappedEnv = (tenant: string, env_name: string) => {
	const envMap: any = {
		viumi: {
			BACKEND_DOMAIN: env.PUBLIC_VIUMI_BACKEND_DOMAIN,
			DASHBOARD_URL: env.PUBLIC_VIUMI_DASHBOARD_URL,
			X_TENANT: env.PUBLIC_VIUMI_X_TENANT
		}
	};

	return envMap[tenant][env_name];
};
