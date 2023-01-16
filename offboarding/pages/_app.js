import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import getConfig from "next/config";
import i18n from "../src/i18n";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 0,
		},
	},
});

function MyApp(props) {
	const { Component, pageProps, tenantName } = props;
	const { publicRuntimeConfig } = getConfig();
	const tenantConfig = publicRuntimeConfig[tenantName];
	const customGTMId =
		(tenantConfig && tenantConfig[`GTM_ID_${tenantName.toUpperCase()}`]) ||
		null;

	const DynamicApp = dynamic(() =>
		import(`../styles/${tenantName}`).then((mod) => {
			const theme = mod.default;
			return () => (
				<>
					<Head>
						<title>Onboarding</title>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
						/>
						<link
							rel="icon"
							type="image/ico"
							href={`/${tenantName}/assets/favicon.ico`}
						/>
						<meta
							name="theme-color"
							content={theme.palette.primary.main}
						/>
						<link
							rel="stylesheet"
							href={`/${tenantName}/fonts/font-family.css`}
						/>
						{customGTMId && (
							<script
								dangerouslySetInnerHTML={{
									__html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer${tenantName.toUpperCase()}', '${customGTMId}');
                    `,
								}}
							/>
						)}
					</Head>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<QueryClientProvider client={queryClient}>
							<Component {...pageProps} />
						</QueryClientProvider>
					</ThemeProvider>
				</>
			);
		})
	);

	React.useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}

		i18n.initialize("es").then();

		(async () => {
			try {
				const locale = await import(
					`../src/tenants/${tenantName}/locales/es.json`
				);

				i18n.addResources("es", "translations", locale.default, true);
				// eslint-disable-next-line no-empty
			} catch {}
		})();
	}, [tenantName]);

	return <DynamicApp />;
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
	tenantName: PropTypes.string.isRequired,
};

MyApp.getInitialProps = ({ ctx }) => ({
	pageProps: {},
	tenantName: ctx?.query?.tenant || "default",
});

export default MyApp;
