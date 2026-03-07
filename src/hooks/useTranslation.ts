import { useState, useEffect } from 'react';
import { en } from '../locales/en';
import { ny } from '../locales/ny';

type Language = 'en' | 'ny';

export const useTranslation = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('farmkit_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('farmkit_lang', lang);
  }, [lang]);

  const t = (key: string) => {
    const translations = lang === 'en' ? en : ny;
    const keys = key.split('.');
    let result: any = translations;

    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Return the key if translation is missing
      }
    }

    return result;
  };

  return { t, lang, setLang };
};
