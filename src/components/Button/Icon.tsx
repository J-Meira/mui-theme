import { IconButton, IconButtonProps } from '@mui/material';

const defaultProps: IconButtonProps = {
  size: 'small',
}

const Icon = ({ children, ...params }: IconButtonProps) => (
  <IconButton {...params}>
    {children}
  </IconButton>
);

Icon.defaultProps = defaultProps;

export default Icon;
