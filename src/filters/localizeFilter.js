import store from '@/store/store'
import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function(key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[Error]: ${key} not found`
}