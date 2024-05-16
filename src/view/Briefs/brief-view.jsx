import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListBrief, getListEmployee } from "../../context/redux/action/action";
import Iconify from "../../components/Iconify/iconify";
import Scrollbar from "../../components/Scrollbar";
import Loading from "../../components/Loading/Loading";
import TableNoData from "../../components/Table/table-no-data";
import UserTableRow from "../../components/Table/emp-table/emp-table-row";
import UserTableHead from "../../components/Table/table-head";
import TableEmptyRows from "../../components/Table/table-empty-rows";
import UserTableToolbar from "../../components/Table/table-toolbar";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../../components/Table/utils";
import TableLoading from "../../components/Table/table-loading";
import BriefTableRow from "../../components/Table/briefs-table/briefs-table-row";

// ----------------------------------------------------------------------

export default function BriefPage() {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("ma_ho_so");

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
      await dispatch(getListBrief());
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const briefs = useSelector((state) => {
    console.log(26, state.briefs);
    return state.briefs;
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = briefs.map((n) => n.muc_dich_tham_dinh);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, muc_dich_tham_dinh) => {
    const selectedIndex = selected.indexOf(muc_dich_tham_dinh);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, muc_dich_tham_dinh);
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
    inputData: briefs,
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
        <Typography variant="h4">Hồ sơ thẩm định</Typography>

        {/* <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Employee
        </Button> */}
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
                rowCount={briefs.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "ma_ho_so", label: "Mã hồ sơ" },
                  { id: "muc_dich_tham_dinh", label: "Mục đích thẩm định" },
                  { id: "mo_ta", label: "Mô tả" },
                  { id: "thoi_gian_tham_dinh", label: "Thời gian thẩm định" },
                  { id: "employee_create", label: "Nhân viên tiếp nhận" },
                  { id: "employee_approval", label: "Người duyệt" },
                  { id: "da_duyet", label: "Xét duyệt" },
                  { id: "priority_name", label: "Độ ưu tiên", align: "center" },
                  { id: "" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BriefTableRow
                      key={row.ma_ho_so}
                      ma_ho_so={row.ma_ho_so}
                      muc_dich_tham_dinh={row.muc_dich_tham_dinh}
                      mo_ta={row.mo_ta}
                      thoi_gian_tham_dinh={row.thoi_gian_tham_dinh}
                      employee_create={row.employee_create}
                      employee_approval={row.employee_approval}
                      create_date={row.create_date}
                      da_duyet={row.da_duyet}
                      priority_name={row.priority_name}
                      selected={selected.indexOf(row.muc_dich_tham_dinh) !== -1}
                      handleClick={(event) =>
                        handleClick(event, row.muc_dich_tham_dinh)
                      }
                    />
                  ))}

                <TableEmptyRows
                  height={10}
                  emptyRows={emptyRows(page, rowsPerPage, briefs.length)}
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
          count={briefs.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
