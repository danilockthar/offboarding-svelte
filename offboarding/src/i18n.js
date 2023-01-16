import i18next from 'i18next';
import { assignIn } from 'lodash';
import { initReactI18next } from 'react-i18next';

import locales from './locales/es.json';


export const translate = (key, payload) => i18next.t(key, payload);

export const i18n = assignIn(translate, i18next, {
  initialize: async (defaultLocale) => {
    await i18next
      .use(initReactI18next)
      .init({
        lng: defaultLocale || 'es',
        defaultNS: 'translations',
        resources: locales,
        nsSeparator: '|',
      });

    await i18next.changeLanguage(defaultLocale);
  },

  addResources(locale, ns, catalog, overwrite= true) {
    i18next.addResourceBundle(locale, ns, catalog, true, overwrite);
  },
});

export default i18n;
