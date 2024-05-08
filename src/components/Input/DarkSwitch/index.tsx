import { Card, IconButton } from '@mui/material';
import {
  MdDarkMode as DarkModeIcon,
  MdLightMode as LightModeIcon,
} from 'react-icons/md';
import { useMultiContext } from '../../MultiProvider';

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
