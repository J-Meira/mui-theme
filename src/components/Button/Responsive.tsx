import { Button, Typography } from '@mui/material';
import { ButtonProps, ResponsiveButtonProps } from '.';
import { MdEdit as DefaultIcon } from 'react-icons/md';

export const Responsive = ({
  children,
  icon = <DefaultIcon />,
  ...rest
}: Omit<ButtonProps, 'model'> & ResponsiveButtonProps) => (
  <Button className='responsive-btn' {...rest}>
    <Typography variant='button'>{icon}</Typography>
    <Typography
      sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}
      variant='button'
    >
      {children}
    </Typography>
  </Button>
);
