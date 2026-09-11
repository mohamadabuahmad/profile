import React, { createContext, useContext } from 'react';

// The active locale's copy (one of locales/*.json) plus its code, for every component on the page.
const ServicesTextContext = createContext(null);

export const ServicesTextProvider = ServicesTextContext.Provider;

export const useServicesText = () => useContext(ServicesTextContext);

// Pick the CLDR plural form ({ one, two, few, many, other }) for n, then fill {n}.
export const plural = (forms, n, locale) => {
  const key = new Intl.PluralRules(locale).select(n);
  return (forms[key] || forms.other).replace('{n}', n);
};

// Fill {placeholders} in a string with strings or React nodes. Returns an array of children.
export const fill = (template, values) =>
  template.split(/(\{\w+\})/).map((part, i) => {
    const key = part.match(/^\{(\w+)\}$/);
    return key && key[1] in values ? <React.Fragment key={i}>{values[key[1]]}</React.Fragment> : part;
  });
