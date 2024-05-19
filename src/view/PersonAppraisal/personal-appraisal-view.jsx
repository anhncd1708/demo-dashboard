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
import {
  getListCustomer,
  getListPersonalAppraisal,
} from "../../context/redux/action/action";
import Iconify from "../../components/Iconify/iconify";
import Scrollbar from "../../components/Scrollbar";
import Loading from "../../components/Loading/Loading";
import TableNoData from "../../components/Table/table-no-data";
import CustomerTableRow from "../../components/Table/customer-table/customer-table-row";
import UserTableHead from "../../components/Table/table-head";
import TableEmptyRows from "../../components/Table/table-empty-rows";
import UserTableToolbar from "../../components/Table/table-toolbar";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../../components/Table/utils";
import TableLoading from "../../components/Table/table-loading";
import AppraisalTableRow from "../../components/Table/appraisal-table/appraisal-table-row";
import PersonalAppraisalTableRow from "../../components/Table/personal-appraisal-table/personal-appraisal-table-row";

// ----------------------------------------------------------------------

export default function PersonalAppraisalView() {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("ten_khach_hang");

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
      await dispatch(getListPersonalAppraisal());
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const personal = useSelector((state) => {
    console.log(26, state.personal);
    return state.personal;
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = personal.map((n) => n.ten_khach_hang);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, ten_khach_hang) => {
    const selectedIndex = selected.indexOf(ten_khach_hang);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ten_khach_hang);
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
    inputData: personal,
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
        <Typography variant="h4">DS thẩm định cá nhân</Typography>

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
                rowCount={personal.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "ma_khach_hang", label: "Mã khách hàng" },
                  { id: "ten_khach_hang", label: "Tên khách hàng" },
                  { id: "loai_khach_hang", label: "Loại" },
                  { id: "to_chuc", label: "Theo diện" },
                  {
                    id: "lam_viec",
                    label: "Tình trạng công việc",
                    align: "center",
                  },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PersonalAppraisalTableRow
                      key={row.ma_khach_hang} // Use ma_khach_hang as the key
                      ma_khach_hang={row.ma_khach_hang}
                      ten_khach_hang={row.ten_khach_hang}
                      loai_khach_hang={row.loai_khach_hang}
                      to_chuc={row.to_chuc}
                      lam_viec={row.lam_viec}
                      selected={selected.indexOf(row.ten_khach_hang) !== -1}
                      handleClick={(event) =>
                        handleClick(event, row.ten_khach_hang)
                      }
                    />
                  ))}

                <TableEmptyRows
                  height={10}
                  emptyRows={emptyRows(page, rowsPerPage, personal.length)}
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
          count={personal.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
