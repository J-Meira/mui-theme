import { createContext } from 'react';

export type MultiProviderLocale = 'en' | 'pt-BR';

export interface MultiContextData {
  backgroundColor: string;
  dark: boolean;
  isAdapterLocalePtBR: boolean;
  locale: MultiProviderLocale;
  modeLocked: boolean;
  onChangeMode: () => void;
}

export const MultiContext = createContext({} as MultiContextData);
