import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

const CustomButton = styled(Button)<CustomProps>(({ colors }) => ({
  color: colors.text,
  backgroundColor: colors.background,
  '&:hover': {
    backgroundColor: colors.backgroundHover,
  },
}));

export interface ColorsButtonProps {
  text: string,
  background: string,
  backgroundHover: string,
}

interface CustomProps extends ButtonProps {
  colors: ColorsButtonProps,
};

const Custom = ({ children, colors, ...params }: CustomProps) => (
  <CustomButton
    variant='contained'
    fullWidth
    colors={colors}
    {...params}
  >
    {children}
  </CustomButton>
)
export default Custom;
