import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "../../components/Iconify/iconify";
import Scrollbar from "../../components/Scrollbar";
import UserTableHead from "../../components/Table/table-head";
import TableToolbar from "../../components/Table/table-toolbar";
import { fetchLoanRequests } from "../../mock/fakeAPI/loanRequestAPI"; // You'll need to create this

const TABLE_HEAD = [
  { id: "id", label: "Mã yêu cầu", alignRight: false },
  { id: "customerName", label: "Tên khách hàng", alignRight: false },
  { id: "loanAmount", label: "Số tiền vay", alignRight: false },
  { id: "loanTerm", label: "Thời hạn vay", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "" },
];

export default function LoanRequestView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loanRequests, setLoanRequests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadLoanRequests = async () => {
      const data = await fetchLoanRequests();
      setLoanRequests(data);
    };
    loadLoanRequests();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = loanRequests.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredLoanRequests = loanRequests.filter((loanRequest) =>
    loanRequest.customerName.toLowerCase().includes(filterName.toLowerCase())
  );

  const isNotFound = !filteredLoanRequests.length && !!filterName;

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Danh sách đề nghị vay vốn
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate("/loan-request/create")}
          >
            Tạo yêu cầu vay mới
          </Button>
        </Stack>

        <Card>
          <TableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={loanRequests.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredLoanRequests
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, customerName, loanAmount, loanTerm, status } =
                        row;
                      const selectedLoanRequest = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedLoanRequest}
                        >
                          <TableCell align="left">{id}</TableCell>

                          <TableCell align="left">{customerName}</TableCell>

                          <TableCell align="left">{loanAmount} VND</TableCell>

                          <TableCell align="left">{loanTerm} tháng</TableCell>

                          <TableCell align="left">{status}</TableCell>

                          <TableCell align="right">
                            <Button
                              size="small"
                              onClick={() => navigate(`/loan-request/${id}`)}
                            >
                              Xem chi tiết
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper sx={{ textAlign: "center" }}>
                          <Typography variant="h6" paragraph>
                            Không tìm thấy
                          </Typography>
                          <Typography variant="body2">
                            Không tìm thấy kết quả cho &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Hãy thử kiểm tra lỗi chính tả hoặc sử dụng từ
                            khóa đầy đủ.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={loanRequests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
