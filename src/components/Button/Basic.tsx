import { Button, ButtonProps } from '@mui/material'

export const Basic = ({ children, ...rest }: ButtonProps) => <Button {...rest}>{children}</Button>
