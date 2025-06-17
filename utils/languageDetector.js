import { NativeModules, Platform } from "react-native";

const languageDetector = {
  type: 'languageDetector',
  init: () => { },
  cacheUserLanguage: () => { },
  detect: () => {
    const defaultLang = 'en_US';
    const supportedLanguages = [
      'en_US',
      'fr_FR'
    ];

    let locale = "";

    if (Platform.OS === 'ios') {
      const _locale = NativeModules.SettingsManager.settings.AppleLocale;
      if (_locale) {
        if (_locale.includes('-')) {
          const splitLocale = _locale?.split('-');
          locale = `${splitLocale[0]}_${splitLocale[0].toUpperCase()}`;
        } else {
          if (_locale.includes('_')) {
            const splitLocale = _locale?.split('_');
            locale = `${splitLocale[0]}_${splitLocale[0].toUpperCase()}`;
          } else {
            locale = `${_locale}_${_locale.toUpperCase()}`;
          }
        }
      } else {
        if (NativeModules.SettingsManager?.settings?.AppleLanguages[0]) {
          locale = NativeModules.SettingsManager?.settings?.AppleLanguages[0].replace('-', '_');
        } else {
          locale = '';
        }
      }
    } else {
      locale = NativeModules.I18nManager?.localeIdentifier?.replace('-', '_') || ''
    }
    
    if (supportedLanguages.includes(locale)) {
      return locale;
    }


    return defaultLang;
  },
}

export { languageDetector };