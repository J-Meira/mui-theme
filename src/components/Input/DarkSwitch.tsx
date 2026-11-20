import { Card, IconButton } from '@mui/material';
import {
  MdDarkMode as DarkModeIcon,
  MdLightMode as LightModeIcon,
} from 'react-icons/md';
import { MultiProviderLocale, useMultiContext } from '../MultiProvider';

export interface DarkSwitchProps {
  label?: string;
  title?: string;
}

const DEFAULT_LABEL: Record<MultiProviderLocale, string> = {
  en: 'Dark mode',
  'pt-BR': 'Modo escuro',
};

export const DarkSwitch = ({ label, title }: DarkSwitchProps) => {
  const { dark, locale, modeLocked, onChangeMode } = useMultiContext();

  if (modeLocked) return null;

  const accessibleLabel = label ?? DEFAULT_LABEL[locale] ?? DEFAULT_LABEL.en;

  return (
    <div
      onClick={() => onChangeMode()}
      className={`dark-switch${dark ? ' dark-switch-on' : ''}`}
    >
      <Card className='board'></Card>
      <IconButton
        aria-label={accessibleLabel}
        aria-pressed={dark}
        size='small'
        sx={{
          backgroundColor: 'background.default',
        }}
        title={title ?? accessibleLabel}
      >
        {dark ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </div>
  );
};
