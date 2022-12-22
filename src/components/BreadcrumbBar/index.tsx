import { Typography, Breadcrumbs, Link } from '@mui/material';

interface BreadcrumbsList{
  link?: string,
  label: string
}

interface BreadcrumbBarProps {
  list: Array<BreadcrumbsList>
}

const BreadcrumbBar = ({ list }: BreadcrumbBarProps) => (
  <Breadcrumbs aria-label='breadcrumb'>
    {list &&
      list.map((item, index) => {
        if (index !== (list.length - 1)) {
          return item.link ? (
            <Link key={index} color='inherit' href={item.link} >
              {item.label}
            </Link>
          ) : (
            <Typography key={index}>{item.label}</Typography>
          );
        }
        else {
          return (<Typography key={index} color='textPrimary'>{item.label}</Typography>);
        }
      })}
  </Breadcrumbs>
);

export default BreadcrumbBar;
