import PropTypes from "prop-types";

import {
  Paper,
  TableRow,
  TableCell,
  Typography,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

// ----------------------------------------------------------------------

export default function TableLoading({ emptyRows, height }) {
  return (
    <TableRow>
      <TableCell
        align="center"
        colSpan={12}
        sx={{
          ...(height && {
            height: height * emptyRows,
          }),
        }}
      >
        <LinearProgress />
      </TableCell>
    </TableRow>
  );
}

TableLoading.propTypes = {
  emptyRows: PropTypes.number,
  height: PropTypes.number,
};
