
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
    priority_code,
    priority_name,
    descriptions
}) {
    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell>{priority_code}</TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                            {priority_name}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>{descriptions ? descriptions : "--"}</TableCell>

            </TableRow>
        </>
    );
}

BriefTableRow.propTypes = {
    selected: PropTypes.any,
    priority_code: PropTypes.any,
    priority_name: PropTypes.any,
    descriptions: PropTypes.any
}

