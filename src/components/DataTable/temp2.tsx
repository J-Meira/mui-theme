const test2 = () => {
  return null;
}

export default test2;
/*import { createStyles, Paper, Table, TableBody, TableContainer, TablePagination, Theme } from '@material-ui/core';
import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';

interface IDataTableColumn {
    id: string
    name: string,
    enableSort?: boolean,
    align?: "center" | "inherit" | "justify" | "left" | "right"
}

interface IDataTableHeadProps {
    columns: IDataTableColumn[],
    order: Order,
    orderBy: keyof any,
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
}

interface IDataTableProps {
    rows: any[],
    columnData?: IDataTableColumn[],
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    console.warn(a, b, orderBy)
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    console.warn(stabilizedThis);
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
            tableLayout: 'fixed',
            '& .MuiTableCell-head': {
                textTransform: 'capitalize',
                fontWeight: 'bold',
            }
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);

const DataTableHead: React.FC<IDataTableHeadProps> = ({ columns, order, orderBy, onRequestSort }): JSX.Element => {
    console.log(columns)
    const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
        <React.Fragment>
            <TableHead>
                <TableRow>
                    {columns.map(column =>
                        (<TableCell
                            key={column.id}
                            align='left'
                            sortDirection={orderBy === column.id ? order : false}
                        >
                            {column.enableSort ?
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={createSortHandler(column.id)}
                                >
                                    {column.name}
                                </TableSortLabel> :
                                column.name
                            }
                        </TableCell>)
                    )}
                </TableRow>
            </TableHead>
        </React.Fragment>
    );
}

const DataTable: React.FC<IDataTableProps> = ({ columnData, rows }): JSX.Element => {

    console.log(columnData, rows)
    let internalColumnData: IDataTableColumn[] = [{
        id: "",
        name: "",
        align: "inherit",
        enableSort: false
    }];
    if(!columnData) {
        if(rows.length) {
            internalColumnData.length = 0;
            Object.keys(rows[0]).map(key => {
                internalColumnData.push({
                    id: String(key),
                    name: String(key),
                    align: "inherit",
                    enableSort: false
                })
            })
        }
    } else {
        internalColumnData = columnData;
    }

    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof any>('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof any) => {
        console.log(orderBy, property)
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <DataTableHead
                                columns={internalColumnData}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        console.log(row)
                                        return (
                                            <TableRow>
                                                {
                                                    Object.keys(row).map((key, index) => <TableCell align={internalColumnData[index].align ? internalColumnData[index].align : "inherit"} key={key}>{row[key]}</TableCell>)
                                                }
                                            </TableRow>
                                        );
                                    })
                                }
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </React.Fragment>
    );

}

export default DataTable;
*/
