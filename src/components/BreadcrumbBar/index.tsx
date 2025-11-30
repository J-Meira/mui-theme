import { Typography, Breadcrumbs, Link } from '@mui/material';

export interface BreadcrumbsListProps {
  link?: string;
  label: string;
}

export interface BreadcrumbBarProps {
  list: BreadcrumbsListProps[];
}

export const BreadcrumbBar = ({ list }: BreadcrumbBarProps) => (
  <Breadcrumbs aria-label='breadcrumb'>
    {list &&
      list.map((item, index) => {
        if (index !== list.length - 1) {
          return item.link ? (
            <Link key={index} color='inherit' href={item.link}>
              {item.label}
            </Link>
          ) : (
            <Typography key={index}>{item.label}</Typography>
          );
        }
        return (
          <Typography key={index} sx={{ color: 'text.primary' }}>
            {item.label}
          </Typography>
        );
      })}
  </Breadcrumbs>
);
