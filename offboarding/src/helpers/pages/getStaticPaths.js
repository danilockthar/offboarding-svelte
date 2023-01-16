const releasesToggles = require('../../../releasesToggles');
const getEnabledTenants = require('../releasesToggles/getEnabledTenants');


const enabledTenants = getEnabledTenants(releasesToggles);

export default async function getStaticPaths() {

  console.log('Enabled tenants list:', enabledTenants);

  const flows = [
    'occasional',
    'professional',
    'company',
  ]

  const paths = []

  enabledTenants.forEach(tenant => {
    flows.forEach(flow => {
      paths.push({
        params: { tenant, flow }
      })
    })
  })


  return {
    paths,
    fallback: false,
  };
}
