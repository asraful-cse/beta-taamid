/* eslint-disable global-require */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	lng: 'en',
	resources: {
		en: {
			translations: require('./locales/en/translations.json'),
		},
		ar: {
			translations: require('./locales/ar/translations.json'),
		},
	},
	ns: ['translations'],
	defaultNS: ['translations'],
});

i18n.languages = ['en', 'ar'];
i18n.init({
	interpolation: {
	  format: function (value, format, lng) {
		if (value instanceof Date) return moment(value).format(format);
		if (typeof value === "number")
		  return new Intl.NumberFormat().format(value);
		return value;
	  }
	}
  });
  
  export { i18n };

export default i18n;
