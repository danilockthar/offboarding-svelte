import React from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { Navigation } from "@geopagos/react-oz-wizard";
import Error from "next/error";
import getConfig from "next/config";
import { GlobalStateProvider } from "../../src/context/GlobalStateContext";
import ConfigurationManager from "../../src/services/configurationManager";
import getStaticProps from "../../src/helpers/pages/getStaticProps";
import getStaticPaths from "../../src/helpers/pages/getStaticPaths";
import OffboardingLayout from "../../src/layouts/OffboardingLayout";

const { publicRuntimeConfig } = getConfig();

const layouts = {
	viumi: "OffboardingLayout"
};

const newTenants = ["viumi"];

const Main = ({ tenantName }) => {
	const [steps, setSteps] = React.useState({});
	const configurationManager = new ConfigurationManager(tenantName);

	React.useEffect(() => {
		console.log("tenantname", tenantName);
		async function dynamicImport() {
			try {
				const stepConfig = await import(
					`../../src/tenants/${tenantName}/config/navigation/main`
				);
				setSteps(stepConfig.default);
			} catch (ex) {
				console.error(ex);
			}
		}
		dynamicImport().then();
	}, [tenantName]);

	return tenantName ? (
		<GlobalStateProvider initialState={{ configurationManager }}>
			{/* <Layout tenantName={tenantName} /> */}
			<Navigation debug={configurationManager.get("DEBUG")} steps={steps}>
				<OffboardingLayout />
			</Navigation>
		</GlobalStateProvider>
	):null
};

Main.propTypes = {
	tenantName: PropTypes.string.isRequired,
};

export { getStaticProps, getStaticPaths };

export default Main;
