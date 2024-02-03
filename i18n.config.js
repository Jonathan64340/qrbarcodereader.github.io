import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { fr_FR, en_US } from './translations';
import { languageDetector } from "./utils/languageDetector";


//empty for now
const resources = {
  ['en_US']: {
    translation: en_US
  },
  ['fr_FR']: {
    translation: fr_FR
  }
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: "fr_FR",
    react: {
      useSuspense: false, //in case you have any suspense related errors
    }
  });

export default i18n;