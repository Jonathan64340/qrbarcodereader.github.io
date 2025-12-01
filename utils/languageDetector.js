import * as Localization from 'expo-localization'

const supportedLanguages = [
  'en_US',
  'fr_FR'
]

const languageDetector = {
  type: 'languageDetector',
  init: () => {},
  cacheUserLanguage: () => {},
  detect: () => {
    const defaultLang = 'en_US'

    const locales = Localization.getLocales()
    if (Array.isArray(locales) && locales.length > 0) {
      const localeObj = locales[0]
      let { languageTag, languageCode, regionCode } = localeObj

      if (!regionCode && languageTag.includes('-')) {
        regionCode = languageTag.split('-')[1]
      }

      let candidate = languageCode
      if (regionCode) {
        candidate = `${languageCode}_${regionCode.toUpperCase()}`
      }

      candidate = candidate.replace('-', '_')

      if (supportedLanguages.includes(candidate)) {
        return candidate
      }

      const base = languageCode
      const match = supportedLanguages.find(l => l.startsWith(base))
      if (match) {
        return match
      }
    }

    return defaultLang
  }
}

export { languageDetector }
