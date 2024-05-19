
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
    id,
    file_name,
    file_url,
    file_type,
    create_date
}) {
    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell>{id}</TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                            {file_name}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>{file_url ? file_url : "--"}</TableCell>
                <TableCell>{file_type ? file_type : "--"}</TableCell>
                <TableCell>
                    {moment(create_date).format("DD/MM/YYYY")}
                </TableCell>

            </TableRow>
        </>
    );
}

BriefTableRow.propTypes = {
    selected: PropTypes.any,
    id: PropTypes.any,
    file_name: PropTypes.any,
    file_url: PropTypes.any,
    file_type: PropTypes.any,
    date_create: PropTypes.any
}
