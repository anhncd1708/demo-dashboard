import PropTypes from "prop-types";
import moment from "moment";

import { Stack, TableRow, TableCell, Typography } from "@mui/material";
import Label from "../../Label/label";

// ----------------------------------------------------------------------

export default function BriefTableRow({
  selected,
  MaHopDongUyThac,
  MaTaiKhoan,
  SoHopDongUyThac,
  MaKhachHang,
  MaNhom,
  MaNhanVien,
  DoiTuongUyThac,
  MaNganhKinhTe,
  MucDichUyThac,
  NganhKinhTe,
  MaThoiHanUyThac,
  SoTienUyThac,
  PhiUyThac,
  NgayThucHien,
  NgayDaoHan,
  LaiSuat,
  ChuKyTraGoc,
  TraGocNgayDau,
  ChuKyTraLai,
  TraLaiNgayDau,
  TaiSanTheChap,
  ThoiGianTao,
}) {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{MaHopDongUyThac}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {MaTaiKhoan}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{SoHopDongUyThac ? SoHopDongUyThac : "--"}</TableCell>
        <TableCell>{MaKhachHang ? MaKhachHang : "--"}</TableCell>
        <TableCell>{MaNhom ? MaNhom : "--"}</TableCell>
        <TableCell>{MaNhanVien ? MaNhanVien : "--"}</TableCell>
        <TableCell>{DoiTuongUyThac ? DoiTuongUyThac : "--"}</TableCell>
        <TableCell>{MaNganhKinhTe ? MaNganhKinhTe : "--"}</TableCell>
        <TableCell>{MucDichUyThac ? MucDichUyThac : "--"}</TableCell>
        <TableCell>{NganhKinhTe ? NganhKinhTe : "--"}</TableCell>
        <TableCell>{MaThoiHanUyThac ? MaThoiHanUyThac : "--"}</TableCell>
        <TableCell>{SoTienUyThac ? SoTienUyThac : "--"}</TableCell>
        <TableCell>{PhiUyThac ? PhiUyThac : "--"}</TableCell>
        <TableCell>{moment(NgayThucHien).format("DD/MM/YYYY")}</TableCell>
        <TableCell>{moment(NgayDaoHan).format("DD/MM/YYYY")}</TableCell>
        <TableCell>{LaiSuat ? LaiSuat : "--"}</TableCell>
        <TableCell>{ChuKyTraGoc ? ChuKyTraGoc : "--"}</TableCell>
        <TableCell>{moment(TraGocNgayDau).format("DD/MM/YYYY")}</TableCell>
        <TableCell>{ChuKyTraLai ? ChuKyTraLai : "--"}</TableCell>
        <TableCell>{moment(TraLaiNgayDau).format("DD/MM/YYYY")}</TableCell>
        <TableCell>
          <Label color={TaiSanTheChap ? "success" : "warning"}>
            {TaiSanTheChap
              ? "Có tài sản thế chấp"
              : "Không có tài sản thế chấp"}
          </Label>
        </TableCell>
        <TableCell>{moment(ThoiGianTao).format("DD/MM/YYYY")}</TableCell>
      </TableRow>
    </>
  );
}

BriefTableRow.propTypes = {
  selected: PropTypes.any,
  MaHopDongUyThac: PropTypes.any,
  MaTaiKhoan: PropTypes.any,
  SoHopDongUyThac: PropTypes.any,
  MaKhachHang: PropTypes.any,
  MaNhom: PropTypes.any,
  MaNhanVien: PropTypes.any,
  DoiTuongUyThac: PropTypes.any,
  MaNganhKinhTe: PropTypes.any,
  MucDichUyThac: PropTypes.any,
  NganhKinhTe: PropTypes.any,
  MaThoiHanUyThac: PropTypes.any,
  SoTienUyThac: PropTypes.any,
  PhiUyThac: PropTypes.any,
  NgayThucHien: PropTypes.any,
  NgayDaoHan: PropTypes.any,
  LaiSuat: PropTypes.any,
  ChuKyTraGoc: PropTypes.any,
  TraGocNgayDau: PropTypes.any,
  ChuKyTraLai: PropTypes.any,
  TraLaiNgayDau: PropTypes.any,
  TaiSanTheChap: PropTypes.any,
  ThoiGianTao: PropTypes.any,
};
