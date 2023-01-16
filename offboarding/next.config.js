const releasesToggles = require('./releasesToggles');

module.exports = {
  future: {
    webpack5: true,
  },
  async generateBuildId() {
    // This is to keep same build id for each replica https://nextjs.org/docs/api-reference/next.config.js/configuring-the-build-id
    return '0.5.0';
  },
  publicRuntimeConfig: {
    DEBUG: process.env.DEBUG === 'true' || false,
    GTM_ID: process.env.GTM_ID,
    TAX_IDENTITY_CHECKER_API: process.env.TAX_IDENTITY_CHECKER_API,
    viumi: {
      FORWARD: true,
      DOMAIN: process.env.VIUMI_DOMAIN,
      API_DOMAIN: process.env.VIUMI_API_DOMAIN,
      COUNTER_TIMER: process.env.VIUMI_COUNTER_TIMER,
      TERMS_AND_CONDITIONS_LINK: process.env.VIUMI_TERMS_AND_CONDITIONS_LINK,
      PLAY_STORE_LINK: process.env.VIUMI_PLAY_STORE_LINK,
      APP_STORE_LINK: process.env.VIUMI_APP_STORE_LINK,
      BUY_READER_DOMAIN: process.env.VIUMI_BUY_READER_DOMAIN,
      DASHBOARD_DOMAIN: process.env.VIUMI_DASHBOARD_DOMAIN,
    },
    releasesToggles,
  },
  /* async rewrites() {
    // Documentation here: https://nextjs.org/docs/api-reference/next.config.js/rewrites
    return {
      fallback: [
        // These rewrites are checked after both pages/public files and dynamic routes are checked
        {
          source: '/api/:path*',
          has: [
            {
              type: 'header',
              key: 'x-tenant',
              value: 'openpay',
            },
          ],
          destination: `${process.env.OPENPAY_API_DOMAIN}/:path*`,
        },
      ],
    }
  } */
};
