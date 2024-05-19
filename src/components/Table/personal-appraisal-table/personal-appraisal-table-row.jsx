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
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function PersonalAppraisalTableRow({
  selected,
  ma_khach_hang,
  ten_khach_hang,
  loai_khach_hang,
  lam_viec,
  to_chuc,
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
      <TableRow hover role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell>{ma_khach_hang}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {ten_khach_hang}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{loai_khach_hang}</TableCell>

        <TableCell>{to_chuc ? "Tổ chức" : "Cá nhân"}</TableCell>

        <TableCell align="center">
          <Label color={lam_viec ? "success" : "error"}>
            {lam_viec ? "Có việc làm" : "Thất nghiệp"}
          </Label>
        </TableCell>
        <TableCell align="right">
          <Link to={`/personal-appraisal/${ma_khach_hang}`}>
            <IconButton>
              <Iconify icon="ic:twotone-read-more" />
            </IconButton>
          </Link>
        </TableCell>

        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <Popover
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
      </Popover> */}
    </>
  );
}

PersonalAppraisalTableRow.propTypes = {
  selected: PropTypes.any,
  ma_khach_hang: PropTypes.any,
  ten_khach_hang: PropTypes.any,
  loai_khach_hang: PropTypes.any,
  to_chuc: PropTypes.any,
  lam_viec: PropTypes.any,
  handleClick: PropTypes.func,
};
