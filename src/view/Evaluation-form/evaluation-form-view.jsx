import { useState, useEffect } from "react";
import {
    Card,
    Stack,
    Table,
    Container,
    TableBody,
    Typography,
    TableContainer,
    TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListFile } from "../../context/redux/action/action";
import Scrollbar from "../../components/Scrollbar";
import TableNoData from "../../components/Table/table-no-data";
import UserTableRow from "../../components/Table/evaluation-table/evaluation-table-row";
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
    {
        id: "id",
        name: "Mã tệp",
        alignRight: false
    },
    {
        id: "file_name",
        label: "Tên tệp",
        alignRight: false
    },
    // {
    //     id: "file_url",
    //     label: "Đường dẫn",
    //     alignRight: false
    // },
    {
        id: "file_type",
        label: "Loại tệp",
        alignRight: false
    },
    {
        id: "create_date",
        label: "Ngày khởi tạo",
        alignRight: false
    },
    {
        id: "",
        label: "",
        alignRight: false
    }
];

// ----------------------------------------------------------------------

export default function EmpPage() {
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState("file_name");

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
            await dispatch(getListFile());
            setLoading(false);
        };
        callAPI();
    }, [dispatch]);

    const files = useSelector((state) => {
        console.log(26, state.files);
        return state.files;
    });

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = files.map((n) => n.file_name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, value) => {
        const selectedIndex = selected.indexOf(value);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, value);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
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
        inputData: files,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4">Mẫu tiêu chí đánh giá</Typography>
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
                                rowCount={files.length}
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
                                            key={row.id}
                                            id={row.id}
                                            file_name={row.file_name}
                                            file_url={row.file_url}
                                            file_type={row.file_type}
                                            create_date={row.create_date}
                                            selected={selected.indexOf(row.file_name) !== -1}
                                            handleClick={(event) => handleClick(event, row.file_name)}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={10}
                                    emptyRows={emptyRows(page, rowsPerPage, files.length)}
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
                    count={files.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
