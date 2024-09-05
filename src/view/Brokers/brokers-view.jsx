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
import { getListBroker } from "../../context/redux/action/action";
import Iconify from "../../components/Iconify/iconify";
import Scrollbar from "../../components/Scrollbar";
import Loading from "../../components/Loading/Loading";
import TableNoData from "../../components/Table/table-no-data";
import BrokerTableRow from "../../components/Table/brokers-table-row/broker-table-row";
import UserTableHead from "../../components/Table/table-head";
import TableEmptyRows from "../../components/Table/table-empty-rows";
import UserTableToolbar from "../../components/Table/table-toolbar";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../../components/Table/utils";
import TableLoading from "../../components/Table/table-loading";

// ----------------------------------------------------------------------

export default function BrokerView() {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("ten");

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
      await dispatch(getListBroker());
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const brokers = useSelector((state) => {
    console.log(26, state.brokers);
    return state.brokers;
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = brokers.map((n) => n.ten);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, ten) => {
    const selectedIndex = selected.indexOf(ten);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ten);
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
    inputData: brokers,
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
        <Typography variant="h4">Người môi giới</Typography>

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
                rowCount={brokers.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "ma_nguoi_moi_gioi", label: "Mã người môi giới" },
                  { id: "ten", label: "Tên người môi giới" },
                  { id: "gioi_tinh", label: "Giới tính" },
                  { id: "giay_to", label: "Giấy tờ" },
                  { id: "dien_thoai", label: "Số điện thoại" },
                  { id: "dia_chi", label: "Địa chỉ" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BrokerTableRow
                      key={row.ma_nguoi_moi_gioi}
                      ma_nguoi_moi_gioi={row.ma_nguoi_moi_gioi}
                      ten={row.ten}
                      gioi_tinh={row.gioi_tinh}
                      giay_to={row.giay_to}
                      dien_thoai={row.dien_thoai}
                      dia_chi={row.dia_chi}
                      selected={selected.indexOf(row.ten) !== -1}
                      handleClick={(event) => handleClick(event, row.ten)}
                    />
                  ))}

                <TableEmptyRows
                  height={10}
                  emptyRows={emptyRows(page, rowsPerPage, brokers.length)}
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
          count={brokers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
