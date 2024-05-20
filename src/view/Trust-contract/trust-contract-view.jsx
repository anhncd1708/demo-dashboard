import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Table,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListTrustContract } from "../../context/redux/action/action";
import Scrollbar from "../../components/Scrollbar";
import TableNoData from "../../components/Table/table-no-data";
import UserTableRow from "../../components/Table/trust-contract-table/trust-contract-table-row";
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
    id: "MaHopDongUyThac",
    name: "Mã hợp đồng",
    alignRight: false,
  },
  {
    id: "MaTaiKhoan",
    label: "Mã tài khoản",
    alignRight: false,
  },
  {
    id: "SoHopDongUyThac",
    label: "Mã tài khoản",
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
    id: "DoiTuongUyThac",
    label: "Đối tượng ủy thác",
    alignRight: false,
  },
  {
    id: "MaNganhKinhTe",
    label: "Mã ngành kinh tế",
    alignRight: false,
  },
  {
    id: "MucDichUyThac",
    label: "Mục đích uy thác",
    alignRight: false,
  },
  {
    id: "NganhKinhTe",
    label: "Ngành kinh tế",
    alignRight: false,
  },
  {
    id: "MaThoiHanUyThac",
    label: "Mã thời hạn uỷ thác",
    alignRight: false,
  },
  {
    id: "SoTienUyThac",
    label: "Ngày mở tài khoản",
    alignRight: false,
  },
  {
    id: "PhiUyThac",
    label: "Ngày đáo hạn",
    alignRight: false,
  },
  {
    id: "NgayThucHien",
    label: "Ngày thức hiện",
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
    label: "Chu kỳ trả góc",
    alignRight: false,
  },
  {
    id: "TraGocNgayDau",
    label: "Trã góc ngày đầu",
    alignRight: false,
  },
  {
    id: "ChuKyTraLai",
    label: "Chu kỳ trả lãi",
    alignRight: false,
  },
  {
    id: "TraLaiNgayDau",
    label: "Trả lãi ngày đầu",
    alignRight: false,
  },
  {
    id: "TaiSanTheChap",
    label: "Tài sản thế chấp",
    alignRight: false,
  },
  {
    id: "ThoiGianTao",
    label: "Thời gian tạo",
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
      await dispatch(getListTrustContract());
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const trustContracts = useSelector((state) => {
    console.log(26, state.trustContracts);
    return state.trustContracts;
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = trustContracts.map((n) => n.file_name);
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
    inputData: trustContracts,
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
        <Typography variant="h4">Hợp động ủy thác</Typography>
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
                rowCount={trustContracts.length}
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
                      key={row.MaHopDongUyThac}
                      MaHopDongUyThac={row.MaHopDongUyThac}
                      MaTaiKhoan={row.MaTaiKhoan}
                      SoHopDongUyThac={row.SoHopDongUyThac}
                      MaKhachHang={row.MaKhachHang}
                      MaNhom={row.MaNhom}
                      MaNhanVien={row.MaNhanVien}
                      DoiTuongUyThac={row.DoiTuongUyThac}
                      MaNganhKinhTe={row.MaNganhKinhTe}
                      MucDichUyThac={row.MucDichUyThac}
                      NganhKinhTe={row.NganhKinhTe}
                      MaThoiHanUyThac={row.MaThoiHanUyThac}
                      SoTienUyThac={row.SoTienUyThac}
                      PhiUyThac={row.PhiUyThac}
                      NgayThucHien={row.NgayThucHien}
                      NgayDaoHan={row.NgayDaoHan}
                      LaiSuat={row.LaiSuat}
                      ChuKyTraGoc={row.ChuKyTraGoc}
                      TraGocNgayDau={row.TraGocNgayDau}
                      ChuKyTraLai={row.ChuKyTraLai}
                      TraLaiNgayDau={row.TraLaiNgayDau}
                      TaiSanTheChap={row.TaiSanTheChap}
                      ThoiGianTao={row.ThoiGianTao}
                      selected={selected.indexOf(row.employees_name) !== -1}
                    />
                  ))}
                <TableEmptyRows
                  height={10}
                  emptyRows={emptyRows(
                    page,
                    rowsPerPage,
                    trustContracts.length
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
          count={trustContracts.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
