import { Card, CardContent, Grid, GridProps } from '@mui/material';

type BrockCardProps = {
  title?: React.ReactNode;
  className?: string;
} & GridProps;

const defaultProps: BrockCardProps = {
  xs: 12,
  sm: 12,
  md: 12,
};

export const BrockCard = ({
  title,
  xs,
  sm,
  md,
  className,
  children,
}: BrockCardProps) => (
  <Grid
    item
    xs={xs}
    sm={sm}
    md={md}
    className={`brock-card ${className ? className : ''}`}
  >
    <Card variant='outlined'>
      <CardContent>
        <Grid container spacing={2}>
          {title && (
            <Grid item md={12} className='title'>
              <h3>{title}</h3>
            </Grid>
          )}
          {children}
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

BrockCard.defaultProps = defaultProps;
