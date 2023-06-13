import { Grid } from '@mui/material';

export interface TabPanelProps {
  activeValue: number;
  children: React.ReactNode;
  error?: string;
  label: string;
  title: string;
  value: number;
}

export const TabPanel = ({
  activeValue,
  children,
  value,
  title,
}: TabPanelProps) => (
  <Grid
    container
    role='tabpanel'
    display={activeValue !== value ? 'none' : 'flex'}
    id={`tabpanel-${title}-${value}`}
    aria-labelledby={`tab-${title}-${value}`}
  >
    {children}
  </Grid>
);
