import type { Locale, LocalizedText } from '../types/content';

export const t = (value: LocalizedText, locale: Locale) => value[locale] || value.tr;

export const localePath = (locale: Locale, trPath: string, enPath: string) =>
  locale === 'tr' ? trPath : `/en${enPath}`;

export const formatDate = (date: string | undefined, locale: Locale) => {
  if (!date) return locale === 'tr' ? 'Tarih güncellenecek' : 'Date to be announced';
  return new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(date));
};
