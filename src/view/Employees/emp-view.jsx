import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Table,
  Button,

  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListEmployee } from "../../context/redux/action/action";
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

// ----------------------------------------------------------------------

export default function EmpPage() {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("employees_name");

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
      await dispatch(getListEmployee());
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const employees = useSelector((state) => {
    console.log(26, state.employees);
    return state.employees;
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = employees.map((n) => n.employees_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, employees_name) => {
    const selectedIndex = selected.indexOf(employees_name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, employees_name);
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
    inputData: employees,
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
        <Typography variant="h4">Nhân viên</Typography>

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
                rowCount={employees.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "employees_code", label: "Mã nhân viên" },
                  { id: "employees_name", label: "Tên nhân viên" },
                  // { id: "email", label: "Email" },
                  // { id: "address", label: "Địa chỉ" },
                  // { id: "gender", label: "Giới tính" },
                  { id: "document_number", label: "Số điện thoại" },
                  { id: "position_name", label: "Chức vụ" },
                  { id: "is_active", label: "Hoạt động", align: "center" },
                  { id: "is_working", label: "Đang làm việc" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.employees_code}
                      employees_code={row.employees_code}
                      employee_image={row.employee_image}
                      employees_name={row.employees_name}
                      position_name={row.position_name}
                      document_number={row.document_number}
                      // address={row.address}
                      // email={row.email}
                      // gender={row.gender}
                      is_active={row.is_active}
                      is_working={row.is_working}
                      selected={selected.indexOf(row.employees_name) !== -1}
                      handleClick={(event) =>
                        handleClick(event, row.employees_name)
                      }
                    />
                  ))}

                <TableEmptyRows
                  height={10}
                  emptyRows={emptyRows(page, rowsPerPage, employees.length)}
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
          count={employees.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
