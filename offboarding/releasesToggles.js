module.exports = {
  ENABLED_TENANTS: {
    TACATACA: process.env.TENANT_TACATACA_ENABLED === 'true',
    FIRSTDATA: process.env.TENANT_FIRSTDATA_ENABLED === 'true',
    SMU: process.env.TENANT_SMU_ENABLED === 'true',
    BN: process.env.TENANT_BN_ENABLED === 'true',
    PUNTOCLAVE: process.env.TENANT_PUNTOCLAVE_ENABLED === 'true',
    WAPA: process.env.TENANT_WAPA_ENABLED === 'true',
    UALA: process.env.TENANT_UALA_ENABLED === 'true',
    OPENPAY: process.env.TENANT_OPENPAY_ENABLED === 'true',
    VIUMI: process.env.TENANT_VIUMI_ENABLED === 'true',
  },
};
