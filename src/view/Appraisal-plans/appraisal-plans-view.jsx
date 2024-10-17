import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { fetchLoanRequestsByStatus } from "../../mock/fakeAPI/loanRequestAPI";
import Iconify from "../../components/Iconify/iconify";
import Scrollbar from "../../components/Scrollbar";
import TableNoData from "../../components/Table/table-no-data";
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

// ----------------------------------------------------------------------

export default function AppraisalPlanView() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("id");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [appraisalPlans, setAppraisalPlans] = useState([]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  useEffect(() => {
    const fetchAppraisalPlans = async () => {
      setLoading(true);
      try {
        const plans = await fetchLoanRequestsByStatus("under-appraisal");
        setAppraisalPlans(plans);
      } catch (error) {
        console.error("Error fetching appraisal plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppraisalPlans();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = appraisalPlans.map((n) => n.customerName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, customerName) => {
    const selectedIndex = selected.indexOf(customerName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, customerName);
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
    inputData: appraisalPlans,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleViewDetails = (id) => {
    navigate(`/appraisal-plan/${id}`);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Danh sách kế hoạch thẩm định</Typography>
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
                rowCount={appraisalPlans.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "id", label: "Mã kế hoạch" },
                  { id: "customerName", label: "Tên khách hàng" },
                  { id: "loanAmount", label: "Số tiền vay" },
                  { id: "loanPurpose", label: "Mục đích vay" },
                  { id: "assetType", label: "Loại tài sản" },
                  { id: "assetValue", label: "Giá trị tài sản" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <AppraisalTableRow
                      key={row.id}
                      id={row.id}
                      customerName={row.customerName}
                      loanAmount={row.loanAmount}
                      loanPurpose={row.loanPurpose}
                      assetType={row.assetType}
                      assetValue={row.assetValue}
                      selected={selected.indexOf(row.customerName) !== -1}
                      handleClick={(event) =>
                        handleClick(event, row.customerName)
                      }
                      onViewDetails={handleViewDetails}
                    />
                  ))}

                <TableEmptyRows
                  height={10}
                  emptyRows={emptyRows(
                    page,
                    rowsPerPage,
                    appraisalPlans.length
                  )}
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
          count={appraisalPlans.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
