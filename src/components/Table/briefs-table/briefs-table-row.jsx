import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

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
import moment from "moment";

// ----------------------------------------------------------------------

export default function BriefTableRow({
  selected,
  ma_ho_so,
  mo_ta,
  muc_dich_tham_dinh,
  thoi_gian_tham_dinh,
  employee_create,
  employee_approval,
  create_date,
  da_duyet,
  priority_name,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const navigate = useNavigate();

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

        <TableCell>{ma_ho_so}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={employees_name} src={employee_image} /> */}
            {/* <Typography variant="subtitle2" noWrap>
              {xung_ho}
            </Typography> */}
            <Typography variant="subtitle2" noWrap>
              {muc_dich_tham_dinh}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{mo_ta ? mo_ta : "--"}</TableCell>
        <TableCell>{moment(thoi_gian_tham_dinh).format("DD/MM/YYYY")}</TableCell>

        <TableCell>{employee_create}</TableCell>

        <TableCell>{employee_approval}</TableCell>

        <TableCell>
          <Label color={da_duyet ? "success" : "warning"}>
            {da_duyet ? "Đã duyệt" : "Chưa duyệt"}
          </Label>
        </TableCell>

        <TableCell>
          <Label color={"success"}>
            {priority_name}
          </Label>
        </TableCell>

        <TableCell align="right">
          <Link to={`/briefs/${ma_ho_so}`}>
            <IconButton >
              <Iconify icon="ic:twotone-read-more" />
            </IconButton>
          </Link>
        </TableCell>

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

BriefTableRow.propTypes = {
  selected: PropTypes.any,
  ma_ho_so: PropTypes.any,
  mo_ta: PropTypes.any,
  muc_dich_tham_dinh: PropTypes.any,
  thoi_gian_tham_dinh: PropTypes.any,
  employee_create: PropTypes.any,
  employee_approval: PropTypes.any,
  create_date: PropTypes.any,
  da_duyet: PropTypes.any,
  priority_name: PropTypes.any,
  handleClick: PropTypes.func,
};
