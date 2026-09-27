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
        const key = `${item.label}-${item.link ?? ''}`;
        const isLast = index === list.length - 1;

        if (isLast) {
          return (
            <Typography key={key} sx={{ color: 'text.primary' }}>
              {item.label}
            </Typography>
          );
        }

        return item.link ? (
          <Link key={key} color='inherit' href={item.link}>
            {item.label}
          </Link>
        ) : (
          <Typography key={key}>{item.label}</Typography>
        );
      })}
  </Breadcrumbs>
);
