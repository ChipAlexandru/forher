import { createContext, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { translations } from '../data/translations';

const LanguageContext = createContext();

const VALID_LANGS = ['de', 'fr', 'en'];

export function LanguageProvider({ urlLang, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const lang = VALID_LANGS.includes(urlLang) ? urlLang : 'de';
  const t = translations[lang];

  const setLang = useCallback((newLang) => {
    if (!VALID_LANGS.includes(newLang)) return;
    const pathWithoutLang = location.pathname.replace(/^\/(de|fr|en)/, '') || '/';
    navigate(`/${newLang}${pathWithoutLang}${location.search}${location.hash}`);
  }, [navigate, location]);

  const langPath = useCallback((path) => `/${lang}${path}`, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, langPath, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
