import { createContext } from 'react';

export interface MultiContextData {
  backgroundColor: string;
  dark: boolean;
  isAdapterLocalePtBR: boolean;
  modeLocked: boolean;
  onChangeMode: () => void;
}

export const MultiContext = createContext({} as MultiContextData);
