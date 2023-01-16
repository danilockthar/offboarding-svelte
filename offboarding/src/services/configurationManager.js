import getConfig from 'next/config';
import get from 'lodash/get';
import config from '../config/';

class ConfigurationManager {
  constructor(tenantName) {
    this.tenant = tenantName;
  }

  get(name) {
    console.log('tenant on configmanager', this.tenant)
    const { publicRuntimeConfig } = getConfig();

    let configName = name;
    const isNotProduction = process.env.ENVIRONMENT !== 'prod';
    const shouldUseMockedApi = isNotProduction && get(publicRuntimeConfig[this.tenant], "USE_MOCK") === true;

    if(shouldUseMockedApi && name === "API_DOMAIN") {
      configName = `${name}_MOCK`
    }

    try {
      return get(publicRuntimeConfig[this.tenant], configName) ||
        get(publicRuntimeConfig, configName) ||
        get(config[this.tenant], configName) ||
        get(config, configName);
    } catch (e) {
      if(isNotProduction) {
        throw new Error(`There is not ${configName} environment variable for ${this.tenant} tenant`);
      }
    }
  }
}

export default ConfigurationManager;