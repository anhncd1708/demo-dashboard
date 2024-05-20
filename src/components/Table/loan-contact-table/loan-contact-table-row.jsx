
import PropTypes from "prop-types";

import {
    Stack,
    TableRow,
    TableCell,
    Typography
} from "@mui/material";

// ----------------------------------------------------------------------

export default function BriefTableRow({
    selected,
    MaHopDongVayVon,
    NganhKinhTe,
    MaTaiKhoan
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

            </TableRow>
        </>
    );
}

BriefTableRow.propTypes = {
    selected: PropTypes.any,
    MaHopDongVayVon: PropTypes.any,
    NganhKinhTe: PropTypes.any,
    MaTaiKhoan: PropTypes.any
}

