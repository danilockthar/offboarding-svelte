import { jsonApiMapper, jsonApiIriMapper, jsonApiIriAlternativeMapper } from "../../helpers/dropdownlists";
import { onlyLettersAndSpaces } from "../../helpers/constraints";

export default {
  fields: {
    common: {
      text: {
        onInput: onlyLettersAndSpaces,
      },
    },
    bankAccount: {
      number: {
        maxLength: 22,
      },
    },
  },
  provinces: {
    endpoint: '/v3/countries/125/provinces',
    adapter: jsonApiMapper,
  },
  cities: {
    endpoint: (provinceId) => `/v3/provinces/${provinceId}/cities`,
    adapter: jsonApiMapper,
  },
  municipalities: {
    endpoint: (cityId) => `/v3/cities/${cityId}/municipalities`,
    adapter: jsonApiMapper,
  },
  neighborhoods: {
    endpoint: (municipalityId) => `/v3/municipalities/${municipalityId}/neighborhoods`,
    adapter: jsonApiMapper,
  },
  registrations: {
    endpoint: '/registrations',
  },
  classifications: {
    endpoint: '/v3/classifications.json',
  },
  banks: {
    endpoint: '/v2/banks?order[name]=asc',
    adapter: jsonApiIriAlternativeMapper,
  },
  bankAccountTypes: {
    endpoint: '/v2/bank-account-types',
    adapter: jsonApiIriMapper,
  }
};
