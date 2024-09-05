import { useState, useEffect } from "react";
import {
    Card,
    Stack,
    Table,
    TableBody,
    Typography,
    TableContainer,
    TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListPriorityLevel } from "../../context/redux/action/action";
import Scrollbar from "../../components/Scrollbar";
import TableNoData from "../../components/Table/table-no-data";
import UserTableRow from "../../components/Table/priority-table/priority-table-row";
import UserTableHead from "../../components/Table/table-head";
import TableEmptyRows from "../../components/Table/table-empty-rows";
import UserTableToolbar from "../../components/Table/table-toolbar";
import {
    emptyRows,
    applyFilter,
    getComparator,
} from "../../components/Table/utils";
import TableLoading from "../../components/Table/table-loading";
//-----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: "priority_code", name: "Mã ưu tiên", alignRight: false },
    { id: "priority_name", label: "Tên độ ưu tiên", alignRight: false },
    { id: "descriptions", label: "Mô tả", alignRight: false }
];

// ----------------------------------------------------------------------

export default function EmpPage() {
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState("priority_name");

    const [filterName, setFilterName] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === "asc";
        if (id !== "") {
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(id);
        }
    };

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const callAPI = async () => {
            await dispatch(getListPriorityLevel());
            setLoading(false);
        };
        callAPI();
    }, [dispatch]);

    const priorities = useSelector((state) => {
        console.log(26, state.priorityLevels);
        return state.priorityLevels;
    });

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = priorities.map((n) => n.priority_name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: priorities,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4">Độ ưu tiên</Typography>
            </Stack>

            <Card>
                <UserTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: "unset" }}>
                        <Table sx={{ minWidth: 800 }}>
                            <UserTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={priorities.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={TABLE_HEAD}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <UserTableRow
                                            key={row.priority_code}
                                            priority_code={row.priority_code}
                                            priority_name={row.priority_name}
                                            descriptions={row.descriptions}
                                            selected={selected.indexOf(row.employees_name) !== -1}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={10}
                                    emptyRows={emptyRows(page, rowsPerPage, priorities.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                                {loading && <TableLoading />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={priorities.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </>
    );
}
