import { createContext, useContext } from 'react';

export { plural, fill } from '../../i18n/format';

// The services page carries its own (large) copy bundle, loaded with the page.
const ServicesTextContext = createContext(null);

export const ServicesTextProvider = ServicesTextContext.Provider;
export const useServicesText = () => useContext(ServicesTextContext);
