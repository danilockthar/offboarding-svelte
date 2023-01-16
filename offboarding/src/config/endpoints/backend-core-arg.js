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
    endpoint: '/v2/provinces',
    adapter: jsonApiMapper,
  },
  cities: {
    endpoint: (provinceId) => `/v2/provinces/${provinceId}/cities`,
    adapter: jsonApiMapper,
  },
  registrations: {
    endpoint: '/registrations',
    token:"v2/registrations/whoami",
  },
  classifications: {
    endpoint: '/classifications',
  },
  banks: {
    endpoint: '/v2/banks?order[name]=asc',
    adapter: jsonApiIriAlternativeMapper,
  },
  bankAccountTypes: {
    endpoint: '/v2/bank-account-types',
    adapter: jsonApiIriMapper,
  },
  isValidTokenJson: {
    endpoint: '/users/isValidToken.json'
  }

};
