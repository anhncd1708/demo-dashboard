import { useState, useEffect } from "react";
import { fetchAllEmployees } from "../../mock/fakeAPI/empAPI";
import {
  Card,
  Stack,
  Table,
  Button,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  Drawer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("employees_name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
    const fetchEmployees = async () => {
      try {
        const data = await fetchAllEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = employees.map((n) => n.employees_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, employee) => {
    const selectedIndex = selected.indexOf(employee.employees_name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, employee.employees_name);
      setSelectedEmployee(employee);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      setSelectedEmployee(null);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      setSelectedEmployee(null);
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      setSelectedEmployee(null);
    }
    setSelected(newSelected);
    console.log(newSelected);
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
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
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
                        handleClick={(event) => handleClick(event, row)}
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
              <TablePagination
                page={page}
                component="div"
                count={employees.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Scrollbar>
        </Card>
      </Box>

      <Drawer
        anchor="right"
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        variant="persistent"
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
          },
        }}
      >
        {selectedEmployee && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin nhân viên
            </Typography>
            <Box sx={{ 
              border: '2px solid #4caf50', 
              borderRadius: '10px', 
              p: 2, 
              backgroundColor: '#e8f5e9',
              position: 'relative'
            }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#2e7d32' }}>
                {selectedEmployee.employees_name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Mã:</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>{selectedEmployee.employees_code}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Chức vụ:</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>{selectedEmployee.position_name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Số điện thoại:</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>{selectedEmployee.document_number}</Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 2, 
                backgroundColor: '#c8e6c9', 
                p: 1, 
                borderRadius: '5px' 
              }}>
                <Typography>Trạng thái:</Typography>
                <Box>
                  <Typography sx={{ 
                    color: selectedEmployee.is_active ? '#4caf50' : '#f44336',
                    fontWeight: 'bold'
                  }}>
                    {selectedEmployee.is_active ? 'Đang hoạt động' : 'Bị vô hiệu hóa'}
                  </Typography>
                  <Typography sx={{ 
                    color: selectedEmployee.is_working ? '#4caf50' : '#f44336',
                    fontWeight: 'bold'
                  }}>
                    {selectedEmployee.is_working ? 'Đang làm việc' : 'Không làm việc'}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                position: 'absolute', 
                top: -10, 
                right: -10, 
                backgroundColor: '#4caf50', 
                color: 'white', 
                borderRadius: '50%', 
                width: 40, 
                height: 40, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                fontWeight: 'bold'
              }}>
                <Iconify icon="mdi:account" width={24} height={24} />
              </Box>
            </Box>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
             Số liệu
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Công việc:</Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '1.2em', fontWeight: 'bold' }}>
                {Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Thời gian làm việc (giờ):</Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '1.2em', fontWeight: 'bold' }}>
                {(Math.random() * 100).toFixed(1)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Điểm KPI:</Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '1.2em', fontWeight: 'bold', color: '#4caf50' }}>
                {Math.floor(Math.random() * 100)}%
              </Typography>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
