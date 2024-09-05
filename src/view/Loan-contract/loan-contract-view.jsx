import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Table,

  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListLoanAgreement } from "../../context/redux/action/action";
import Scrollbar from "../../components/Scrollbar";
import TableNoData from "../../components/Table/table-no-data";
import UserTableRow from "../../components/Table/loan-contact-table/loan-contact-table-row";
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
  {
    id: "MaHopDongVayVon",
    name: "Mã hợp đồng",
    alignRight: false,
  },
  {
    id: "NganhKinhTe",
    label: "Ngành kinh tế",
    alignRight: false,
  },
  {
    id: "MaTaiKhoan",
    label: "Mã tài khoản",
    alignRight: false,
  },
  {
    id: "MaHopDongTinDung",
    label: "Mã hợp đồng tín dụng",
    alignRight: false,
  },
  {
    id: "MaKhachHang",
    label: "Mã khách hàng",
    alignRight: false,
  },
  {
    id: "MaNhom",
    label: "Mã nhóm",
    alignRight: false,
  },
  {
    id: "MaNhanVien",
    label: "Mã nhân viên",
    alignRight: false,
  },
  {
    id: "MucDichVayChiTiet",
    label: "Mục đích vay",
    alignRight: false,
  },
  {
    id: "MaMucDichVay",
    label: "Mã mục đích vay",
    alignRight: false,
  },
  {
    id: "HanMucVay",
    label: "Hạn mức vay",
    alignRight: false,
  },
  {
    id: "MaThoiHanUyThac",
    label: "Mã thời hạn uỷ thác",
    alignRight: false,
  },
  {
    id: "NgayMoTaiKhoan",
    label: "Ngày mở tài khoản",
    alignRight: false,
  },
  {
    id: "NgayDaoHan",
    label: "Ngày đáo hạn",
    alignRight: false,
  },
  {
    id: "LaiSuat",
    label: "Lãi suất",
    alignRight: false,
  },
  {
    id: "ChuKyTraGoc",
    label: "Chu kỳ trả gốc",
    alignRight: false,
  },
  {
    id: "NgayTraGocDauTien",
    label: "Ngày trả gốc đầu tiên",
    alignRight: false,
  },
  {
    id: "ChuKyTraLai",
    label: "Chu kỳ trả lãi",
    alignRight: false,
  },
  {
    id: "NgayTraLaiDauTien",
    label: "Ngày trả lãi đầu tiên",
    alignRight: false,
  },
  {
    id: "TaiSanTheChap",
    label: "Tài sản thế chấp",
    alignRight: false,
  },
];

// ----------------------------------------------------------------------

export default function EmpPage() {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("file_name");

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
      await dispatch(getListLoanAgreement());
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const loanAgreements = useSelector((state) => {
    console.log(26, state.loanAgreements);
    return state.loanAgreements;
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = loanAgreements.map((n) => n.file_name);
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
    inputData: loanAgreements,
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
        <Typography variant="h4">Mẫu tiêu chí đánh giá</Typography>
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
                rowCount={loanAgreements.length}
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
                      key={row.MaHopDongVayVon}
                      MaHopDongVayVon={row.MaHopDongVayVon}
                      NganhKinhTe={row.NganhKinhTe}
                      MaTaiKhoan={row.MaTaiKhoan}
                      MaHopDongTinDung={row.MaHopDongTinDung}
                      MaKhachHang={row.MaKhachHang}
                      MaNhom={row.MaNhom}
                      MaNhanVien={row.MaNhanVien}
                      MucDichVayChiTiet={row.MucDichVayChiTiet}
                      MaMucDichVay={row.MaMucDichVay}
                      HanMucVay={row.HanMucVay}
                      MaThoiHanUyThac={row.MaThoiHanUyThac}
                      NgayMoTaiKhoan={row.MaHopDongTinDung}
                      NgayDaoHan={row.NgayDaoHan}
                      LaiSuat={row.LaiSuat}
                      ChuKyTraGoc={row.ChuKyTraGoc}
                      NgayTraGocDauTien={row.NgayTraGocDauTien}
                      ChuKyTraLai={row.ChuKyTraLai}
                      NgayTraLaiDauTien={row.NgayTraLaiDauTien}
                      TaiSanTheChap={row.TaiSanTheChap}
                      selected={selected.indexOf(row.employees_name) !== -1}
                    />
                  ))}
                <TableEmptyRows
                  height={10}
                  emptyRows={emptyRows(
                    page,
                    rowsPerPage,
                    loanAgreements.length
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
          count={loanAgreements.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
