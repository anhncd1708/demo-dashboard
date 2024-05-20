
import PropTypes from "prop-types";

import {
    Stack,
    TableRow,
    TableCell,
    Typography
} from "@mui/material";
import moment from "moment";
import Label from "../../Label/label";

// ----------------------------------------------------------------------

export default function BriefTableRow({
    selected,
    MaHopDongVayVon,
    NganhKinhTe,
    MaTaiKhoan,
    MaHopDongTinDung,
    MaKhachHang,
    MaNhom,
    MaNhanVien,
    NgayDaoHan,
    MucDichVayChiTiet,
    MaMucDichVay,
    HanMucVay,
    MaThoiHanUyThac,
    NgayMoTaiKhoan,
    ChuKyTraGoc,
    NgayTraGocDauTien,
    ChuKyTraLai,
    NgayTraLaiDauTien,
    TaiSanTheChap,
    LaiSuat
}) {
    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell>{MaHopDongVayVon}</TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                            {NganhKinhTe}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>{MaTaiKhoan ? MaTaiKhoan : "--"}</TableCell>

                <TableCell>{MaHopDongTinDung ? MaHopDongTinDung : "--"}</TableCell>
                <TableCell>{MaKhachHang ? MaKhachHang : "--"}</TableCell>
                <TableCell>{MaNhom ? MaNhom : "--"}</TableCell>
                <TableCell>{MaNhanVien ? MaNhanVien : "--"}</TableCell>
                <TableCell>{MucDichVayChiTiet ? MucDichVayChiTiet : "--"}</TableCell>
                <TableCell>{MaMucDichVay ? MaMucDichVay : "--"}</TableCell>
                <TableCell>{HanMucVay ? HanMucVay : "--"}</TableCell>
                <TableCell>{MaThoiHanUyThac ? MaThoiHanUyThac : "--"}</TableCell>
                <TableCell>{moment(NgayMoTaiKhoan).format("DD/MM/YYYY")}</TableCell>

                <TableCell>{moment(NgayDaoHan).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{LaiSuat ? LaiSuat : "--"}</TableCell>

                <TableCell>{ChuKyTraGoc ? ChuKyTraGoc : "--"}</TableCell>
                <TableCell>{moment(NgayTraGocDauTien).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{ChuKyTraLai ? ChuKyTraLai : "--"}</TableCell>
                <TableCell>{moment(NgayTraLaiDauTien).format("DD/MM/YYYY")}</TableCell>
                <TableCell>
                    <Label color={TaiSanTheChap ? "success" : "warning"}>
                        {TaiSanTheChap ? "Có tài sản thế chấp" : "Không có tài sản thế chấp"}
                    </Label>
                </TableCell>
            </TableRow>
        </>
    );
}

BriefTableRow.propTypes = {
    selected: PropTypes.any,
    MaHopDongVayVon: PropTypes.any,
    NganhKinhTe: PropTypes.any,
    MaTaiKhoan: PropTypes.any,
    MaHopDongTinDung: PropTypes.any,
    MaKhachHang: PropTypes.any,
    MaNhom: PropTypes.any,
    MaNhanVien: PropTypes.any,
    MucDichVayChiTiet: PropTypes.any,
    MaMucDichVay: PropTypes.any,
    HanMucVay: PropTypes.any,
    MaThoiHanUyThac: PropTypes.any,
    NgayMoTaiKhoan: PropTypes.any,
    NganhKinhTe: PropTypes.any,
    ChuKyTraGoc: PropTypes.any,
    NgayTraGocDauTien: PropTypes.any,
    ChuKyTraLa: PropTypes.any,
    NgayTraLaiDauTien: PropTypes.any,
    TaiSanTheChap: PropTypes.any,
    NgayDaoHan: PropTypes.any,
    LaiSuat: PropTypes.any
}

