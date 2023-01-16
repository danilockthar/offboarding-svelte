const getTenantInfo = (tenant) => {
  const [tenantName, enabled] = tenant;
  return {name: tenantName.toLowerCase(), enabled};
};

const getTenantsFromReleaseToggles = (toggles) => Object.values(toggles).reduce((list, tenants) => {
  
    const mappedTenants = Object.entries(tenants).map(getTenantInfo);
    console.log(mappedTenants)
    return [...list, ...mappedTenants];
  }, [])

const getEnabledTenants = (releasesToggles) => getTenantsFromReleaseToggles(releasesToggles)
    .filter((tenant) => tenant.enabled)
    .map((tenant) => tenant.name);

module.exports = getEnabledTenants;