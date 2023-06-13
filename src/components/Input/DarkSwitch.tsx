import { Card, IconButton } from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useMultiContext } from '../MultiProvider';

export const DarkSwitch = () => {
  const { dark, onChangeMode } = useMultiContext();
  return (
    <div
      onClick={() => onChangeMode()}
      className={`dark-switch${dark ? ' dark-switch-on' : ''}`}
    >
      <Card className='board'></Card>
      <IconButton
        size='small'
        sx={{
          backgroundColor: 'background.default',
        }}
      >
        {dark ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </div>
  );
};
