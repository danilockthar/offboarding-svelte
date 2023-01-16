import React, { FC } from 'react';
import { Navigation } from '@geopagos/react-oz-wizard';
import  dynamic  from 'next/dynamic';
import { useRouter } from 'next/router';
import { GlobalStateProvider } from 'src/context/GlobalStateContext';
import ConfigurationManager from 'src/services/configurationManager';
import getStaticProps from 'src/helpers/pages/getStaticProps';
import getStaticPaths from 'src/helpers/pages/getStaticPaths';

const layouts = {
  viumi: 'OffboardingLayout',
};

const OffboardingFlow = ({ tenantName }) => {
  console.log(tenantName)
  const [Layout, setLayout] = React.useState();
  const [steps, setSteps] = React.useState({});
  const router = useRouter();
  const configurationManager = new ConfigurationManager(tenantName);

  React.useEffect(() => {
    async function dynamicImport() {
      const stepConfig = await import(
        `src/tenants/${tenantName}/config/navigation/main`
        
      );
      console.log('stepconfig',stepConfig)
      setSteps(stepConfig.default);

      const layout = dynamic(() =>
        import(`src/layouts/${layouts[tenantName]}`),
      );
      console.log('layouts', layout)
      setLayout(layout);
    }

    dynamicImport().then();
  }, [tenantName]);

  return Layout ? (
    <GlobalStateProvider initialState={{ configurationManager }}>
      <Navigation debug={configurationManager.get('DEBUG')} steps={steps}>
        <Layout tenantName={tenantName} />
      </Navigation>
    </GlobalStateProvider>
  ) : null;
};

export { getStaticProps, getStaticPaths };

export default OffboardingFlow;
