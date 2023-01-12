import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "@geopagos/react-oz-wizard";
import { useRouter } from "next/router";

const Index = ({ tenantName }) => {
	const [steps, setSteps] = useState<any | null>({});
	const [Layout, setLayout] = useState(null);

	React.useEffect(() => {
		async function dynamicImport() {
			try {
				const stepConfig = await import(
					`../../src/tenants/${tenantName}/config/navigation/main`
				);
				setSteps(stepConfig.default);
			} catch (ex) {
				console.error(ex);
			}
			const layout = dynamic(() => import(`../../src/layouts/Default`));
			setLayout(() => layout);
		}
		dynamicImport().then();
	}, [tenantName]);

	return Layout ? (
		<Navigation debug={true} steps={steps}>
			<Layout />
		</Navigation>
	) : null;
};
export async function getStaticPaths() {
	return {
		paths: [{ params: { tenant: "viumi" } }],
		fallback: false, // can also be true or 'blocking'
	};
}

export async function getStaticProps({ params }) {
	console.log(params.tenant);
	return {
		props: {
			tenantName: params?.tenant || null,
		},
	};
}
export default Index;
