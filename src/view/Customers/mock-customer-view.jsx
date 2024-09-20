import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import BaseOptionChart from '../../components/Chart/BaseOptionChart';
import {
  Card,
  Stack,
  Button,
  Typography,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mockCustomers } from "../../mock/mock-data";
import Iconify from "../../components/Iconify/iconify";
import Scrollbar from "../../components/Scrollbar";
import TableNoData from "../../components/Table/table-no-data";
import MockCustomerTableRow from "../../components/Table/customer-table/mock-customer-table-row";
import UserTableHead from "../../components/Table/table-head";
import TableEmptyRows from "../../components/Table/table-empty-rows";
import UserTableToolbar from "../../components/Table/table-toolbar";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../../components/Table/utils";
import TableLoading from "../../components/Table/table-loading";
import EditIcon from "@mui/icons-material/Edit";
import { fetchCustomersWithEmptyFields } from '../../mock/fakeAPI/customerAPI';

const translateField = (field) => {
  const translations = {
    name: 'Tên',
    membershipNumber: 'Mã thành viên',
    phone: 'Số điện thoại',
    email: 'Email',
    address: 'Địa chỉ',
    dateOfBirth: 'Ngày sinh',
    contactAddress: 'Địa chỉ liên lạc',
    residentialAddress: 'Địa chỉ cư trú',
    residentialArea: 'Địa bàn cư trú',
    idNumber: 'Số giấy tờ',
    idIssuePlace: 'Nơi cấp',
    idIssueDate: 'Ngày cấp',
    idExpiryDate: 'Ngày hết hạn',
    frontIdImage: 'Ảnh mặt trước',
    backIdImage: 'Ảnh mặt sau',
    signatureImage: 'Chữ ký',
    idType: 'Loại giấy tờ',
    notes: 'Ghi chú'
    // Add more translations as needed
  };
  return translations[field] || field;
};

export default function MockCustomerView() {
  const chartOptions = BaseOptionChart();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customers, setCustomers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const navigate = useNavigate();
  const [chartSize, setChartSize] = useState({ width: 500, height: 300 });
  const chartContainerRef = useRef(null);
  const [customersWithEmptyFields, setCustomersWithEmptyFields] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCustomers(mockCustomers);
      setLoading(false);
    };
    const fetchData = async () => {
      try {
        const customers = await fetchCustomersWithEmptyFields();
        setCustomersWithEmptyFields(customers);
      } catch (error) {
        console.error("Error fetching customers with empty fields:", error);
      }
    };
    fetchData();
    fetchCustomers();
    chartResize();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = customers.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleEdit = (id) => {
    // Navigate to edit page
    navigate(`/customers/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    const customerToDelete = customers.find((customer) => customer.id === id);
    setCustomerToDelete(customerToDelete);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (customerToDelete) {
      setCustomers(
        customers.filter((customer) => customer.id !== customerToDelete.id)
      );
    }
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  const handleViewCustomer = (id) => {
    navigate(`/customers/${id}`);
  };

  const dataFiltered = applyFilter({
    inputData: customers,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const getCustomerGrowth = () => "+15%";
  const getCustomerStats = () => [
    { month: 'Tháng 1', customers: 100 },
    { month: 'Tháng 2', customers: 117 },
    { month: 'Tháng 3', customers: 150 },
    { month: 'Tháng 4', customers: 60 },
    { month: 'Tháng 5', customers: 120 },
    { month: 'Tháng 6', customers: 80 },
  ];

  const chartData = [
    {
      name: 'Khách hàng',
      type: 'line',
      data: getCustomerStats().map(stat => stat.customers),
    },
  ];

  const mergedChartOptions = {
    ...chartOptions,
    xaxis: {
      ...chartOptions.xaxis,
      categories: getCustomerStats().map(stat => stat.month),
    },
    yaxis: {
      ...chartOptions.yaxis,
      // title: {
      //   text: 'Số lượng khách hàng',
      // },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} khách hàng`;
          }
          return y;
        },
      },
    },
  };

  const chartResize = () => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        const { width } = chartContainerRef.current.getBoundingClientRect();
        setChartSize({ width: width, height: width * 0.6 }); // Adjust the height ratio as needed
      }
    };

    handleResize(); // Initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }


  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Khách hàng</Typography>
      </Stack>

      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              backgroundColor: 'white',
              color: 'black',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Thống kê khách hàng</Typography>
              <Button variant="outlined" endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                Mỗi tháng
              </Button>
            </Box>
            <Box ref={chartContainerRef} width="100%" height="auto">
              <ReactApexChart
                type="line"
                series={chartData}
                options={mergedChartOptions}
                height={364}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              p: 3,
              height: '100%',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Danh sách khách hàng chưa hoàn thiện thông tin
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="customers with empty fields">
                <TableHead>
                  <TableRow sx={{
                    "& .MuiTableCell-head": {
                      color: "white",
                      backgroundColor: "rgba(255, 171, 0, 0.80)"
                    },
                  }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Tên khách hàng</TableCell>
                    <TableCell>Mã thành viên</TableCell>
                    <TableCell>Thông tin còn thiếu</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customersWithEmptyFields
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((customer) => {
                      const emptyFields = Object.entries(customer)
                        .filter(([_, value]) => value === '' || value === null || value === undefined)
                        .map(([key]) => translateField(key));

                      return (
                        <TableRow
                          key={customer.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {customer.id}
                          </TableCell>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>{customer.membershipNumber}</TableCell>
                          <TableCell>{emptyFields.join(', ')}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              aria-label="Chỉnh sửa"
                              onClick={() => handleEdit(customer.id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {loading && <TableLoading />}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={customersWithEmptyFields.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Grid>

      </Grid>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Divider />
        <Typography variant="h5" >
          Danh sách tổng
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate("/customers/add")}
        >
          Thêm khách hàng mới
        </Button>
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
                rowCount={customers.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "id", label: "ID" },
                  { id: "name", label: "Tên khách hàng" },
                  { id: "gender", label: "Giới tính" },
                  { id: "membershipNumber", label: "Số thẻ thành viên" },
                  { id: "phone", label: "Số điện thoại" },
                  { id: "email", label: "Email" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <MockCustomerTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      gender={row.gender}
                      membershipNumber={row.membershipNumber}
                      phone={row.phone}
                      email={row.email}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                      onView={handleViewCustomer}
                    />
                  ))}

                <TableEmptyRows
                  height={10}
                  emptyRows={emptyRows(page, rowsPerPage, customers.length)}
                />

                {notFound && <TableNoData query={filterName} />}
                {loading && <TableLoading />}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            page={page}
            component="div"
            count={customers.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Scrollbar>


      </Card>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa khách hàng"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa khách hàng {customerToDelete?.name}? Hành
            động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Hủy</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Xác nhận xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
