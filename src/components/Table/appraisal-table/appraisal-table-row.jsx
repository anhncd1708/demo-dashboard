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

export default function AppraisalTableRow({
  selected,
  ma_ke_hoach,
  ten_ke_hoach,
  mo_ta_ke_hoach,
  nguoi_them,
  gia_tri,
  da_tham_dinh,
  create_date,
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
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{ma_ke_hoach}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={employees_name} src={employee_image} /> */}
            {/* <Typography variant="subtitle2" noWrap>
              {xung_ho}
            </Typography> */}
            <Typography variant="subtitle2" noWrap>
              {ten_ke_hoach}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{mo_ta_ke_hoach}</TableCell>

        <TableCell>{nguoi_them}</TableCell>

        <TableCell align="center">{gia_tri ? gia_tri : "--"}</TableCell>

        <TableCell>
          <Label color={da_tham_dinh ? "success" : "warning"}>
            {da_tham_dinh ? "Đã thẩm định" : "Chưa thẩm định"}
          </Label>
        </TableCell>

        <TableCell>{create_date}</TableCell>

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

AppraisalTableRow.propTypes = {
  selected: PropTypes.any,
  ma_ke_hoach: PropTypes.any,
  ten_ke_hoach: PropTypes.any,
  mo_ta_ke_hoach: PropTypes.any,
  nguoi_them: PropTypes.any,
  gia_tri: PropTypes.any,
  da_tham_dinh: PropTypes.any,
  create_date: PropTypes.any,
  handleClick: PropTypes.func,
};
