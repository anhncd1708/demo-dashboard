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
import { getListAsset } from "../../context/redux/action/action";
import Scrollbar from "../../components/Scrollbar";
import TableNoData from "../../components/Table/table-no-data";
import UserTableRow from "../../components/Table/assets-table/asset-table-row";
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
    { id: "ma_tai_san", name: "Mã tài sản", alignRight: false },
    { id: "ten_tai_san", label: "Tên tài sản", alignRight: false },
    { id: "mo_ta", label: "Mô tả", alignRight: false },
    { id: "ngay_dinh_gia", label: "Ngày định giá", alignRight: false },
    { id: "chu_so_huu", label: "Chủ sở hữu", alignRight: false },
    { id: "loai_tai_san", label: "Loại tài sản", alignRight: false },
    { id: "nguoi_them", label: "Người thêm", alignRight: false },
    { id: "create_date", label: "Ngày khởi tạo", alignRight: false }
];

// ----------------------------------------------------------------------

export default function EmpPage() {
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState("ten_tai_san");

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
            await dispatch(getListAsset());
            setLoading(false);
        };
        callAPI();
    }, [dispatch]);

    const assets = useSelector((state) => {
        console.log(26, state.assets);
        return state.assets;
    });

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = assets.map((n) => n.ten_tai_san);
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
        inputData: assets,
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
                <Typography variant="h4">Tài sản</Typography>
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
                                rowCount={assets.length}
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
                                            key={row.ma_tai_san}
                                            ma_tai_san={row.ma_tai_san}
                                            ten_tai_san={row.ten_tai_san}
                                            mo_ta={row.mo_ta}
                                            ngay_dinh_gia={row.ngay_dinh_gia}
                                            chu_so_huu={row.chu_so_huu}
                                            loai_tai_san={row.loai_tai_san}
                                            create_date={row.create_date}
                                            nguoi_them={row.nguoi_them}
                                            selected={selected.indexOf(row.employees_name) !== -1}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={10}
                                    emptyRows={emptyRows(page, rowsPerPage, assets.length)}
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
                    count={assets.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </>
    );
}
