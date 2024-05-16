import { useState } from "react";
import PropTypes from "prop-types";

import {
  Stack,
  Avatar,
  Popover,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  Typography,
  IconButton,
} from "@mui/material";

import Label from "../../Label/label";
import Iconify from "../../Iconify/iconify";

// ----------------------------------------------------------------------

export default function BrokerTableRow({
  selected,
  ma_nguoi_moi_gioi,
  ten,
  giay_to,
  dia_chi,
  gioi_tinh,
  dien_thoai,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell>{ma_nguoi_moi_gioi}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={employees_name} src={employee_image} /> */}
            {/* <Typography variant="subtitle2" noWrap>
              {xung_ho}
            </Typography> */}
            <Typography variant="subtitle2" noWrap>
              {ten}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{gioi_tinh}</TableCell>

        <TableCell>{giay_to}</TableCell>

        <TableCell>{dien_thoai}</TableCell>

        <TableCell>{dia_chi}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

BrokerTableRow.propTypes = {
  selected: PropTypes.any,
  ma_nguoi_moi_gioi: PropTypes.any,
  ten: PropTypes.any,
  gioi_tinh: PropTypes.any,
  giay_to: PropTypes.any,
  dien_thoai: PropTypes.any,
  dia_chi: PropTypes.any,
  handleClick: PropTypes.func,
};
