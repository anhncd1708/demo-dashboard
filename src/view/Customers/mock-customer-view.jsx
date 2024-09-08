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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

export default function MockCustomerView() {
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

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCustomers(mockCustomers);
      setLoading(false);
    };
    fetchCustomers();
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

  const dataFiltered = applyFilter({
    inputData: customers,
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
        <Typography variant="h4">Khách hàng</Typography>
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
                  { id: "id", label: "Mã khách hàng" },
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
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
