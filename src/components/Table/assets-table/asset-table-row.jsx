
import PropTypes from "prop-types";

import {
    Stack,
    TableRow,
    TableCell,
    Typography
} from "@mui/material";

import moment from "moment";
// ----------------------------------------------------------------------

export default function BriefTableRow({
    selected,
    ma_tai_san,
    ten_tai_san,
    mo_ta,
    ngay_dinh_gia,
    chu_so_huu,
    loai_tai_san,
    create_date,
    nguoi_them
}) {
    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell>{ma_tai_san}</TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                            {ten_tai_san}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>{mo_ta ? mo_ta : "--"}</TableCell>
                <TableCell>
                    {moment(ngay_dinh_gia).format("DD/MM/YYYY")}
                </TableCell>

                <TableCell>{chu_so_huu}</TableCell>

                <TableCell>{loai_tai_san}</TableCell>

                <TableCell>{nguoi_them}</TableCell>

                <TableCell>
                    {moment(create_date).format("DD/MM/YYYY")}
                </TableCell>

            </TableRow>
        </>
    );
}

BriefTableRow.propTypes = {
    selected: PropTypes.any,
    ma_tai_san: PropTypes.any,
    ten_tai_san: PropTypes.any,
    mo_ta: PropTypes.any,
    ngay_dinh_gia: PropTypes.any,
    chu_so_huu: PropTypes.any,
    loai_tai_san: PropTypes.any,
    create_date: PropTypes.any,
    nguoi_them: PropTypes.any,
    create_date: PropTypes.any
};
