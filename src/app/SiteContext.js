import { createContext, useContext } from 'react';
import { LOCALES, pathFor } from '../i18n/locales';

// Everything the chrome (nav, footer, links) needs: the active locale, the current page id
// and that locale's shared strings.
const SiteContext = createContext({ locale: 'en', page: 'home', t: {} });

export const SiteProvider = SiteContext.Provider;

export const useSite = () => {
  const value = useContext(SiteContext);
  return {
    ...value,
    dir: LOCALES[value.locale].dir,
    rtl: LOCALES[value.locale].dir === 'rtl',
    path: (page, locale = value.locale) => pathFor(page, locale),
  };
};

export default SiteContext;
