import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { Navigation } from '@geopagos/react-oz-wizard';
import Error from 'next/error';
import getConfig from 'next/config';
import { GlobalStateProvider } from '../../src/context/GlobalStateContext';
import ConfigurationManager from '../../src/services/configurationManager';
import getStaticProps from '../../src/helpers/pages/getStaticProps';
import getStaticPaths from '../../src/helpers/pages/getStaticPaths';

const { publicRuntimeConfig } = getConfig();

const layouts = {
  tacataca: 'HalfDownColoredBackgroundWithGradient',
  firstdata: 'SideImage',
  bn: 'ColoredBackgroundWithGradient',
  openpay: 'Openpay',
  smu: 'Smu',
  wapa: 'Wapa',
  puntoclave: 'PuntoClave',
  uala: 'Uala',
};

const newTenants = ['openpay', 'puntoclave', 'uala', 'wapa', 'viumi'];

const Main = ({ tenantName }) => {
  const [Layout, setLayout] = React.useState();
  const [steps, setSteps] = React.useState({});

  const configurationManager = new ConfigurationManager(tenantName);

  React.useEffect(() => {
    console.log('tenantname', tenantName)
    async function dynamicImport() {
      try {
        const stepConfig = await import(
          `../../src/tenants/${tenantName}/config/navigation/main`
          
        );
        setSteps(stepConfig.default);
      } catch (ex) {
        console.error(ex);
      }

      const layout = dynamic(() =>
        import(`../../src/layouts/${layouts[tenantName]}`)  
      );

      setLayout(layout);
    }
    dynamicImport().then();
  }, [tenantName]);
  return <div>{tenantName}</div>}

//   return Layout ? (
//     <GlobalStateProvider initialState={{ configurationManager }}>
//       {newTenants.includes(tenantName) ? (
//         <Navigation debug={configurationManager.get('DEBUG')} steps={steps}>
//           <Layout tenantName={tenantName} />
//         </Navigation>
//       ) : (
//         <Layout tenantName={tenantName}>
//           {({ onStepChange }) => (
//             <Navigation
//               debug={configurationManager.get('DEBUG')}
//               steps={steps}
//               onStepChange={onStepChange}
//             />
//           )}
//         </Layout>
//       )}
//     </GlobalStateProvider>
//   ) : null;
// };



Main.propTypes = {
  tenantName: PropTypes.string.isRequired,
};

export { getStaticProps, getStaticPaths };

export default Main;
