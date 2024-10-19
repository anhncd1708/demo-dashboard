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

export default function UserTableRow({
  selected,
  employee_image,
  employees_code,
  employees_name,
  // address,
  // email,
  // gender,
  document_number,
  position_name,
  is_active,
  is_working,
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
      <TableRow 
        hover 
        tabIndex={-1} 
        role="checkbox" 
        selected={selected}
        onClick={(event) => handleClick(event, { employees_name, employees_code, position_name, document_number, is_active, is_working })}
        sx={{ cursor: 'pointer' }}
      >
        <TableCell>{employees_code}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={employees_name} src={employee_image} />
            <Typography variant="subtitle2" noWrap>
              {employees_name}
            </Typography>
          </Stack>
        </TableCell>
        {/* 
        <TableCell>{email ? email : "--"}</TableCell>
        <TableCell>{address ? address : "--"}</TableCell>
        <TableCell>{gender ? "Nam" : "Nữ"}</TableCell> */}
        <TableCell>{document_number ? document_number : "--"}</TableCell>

        <TableCell>{position_name}</TableCell>

        <TableCell align="center">
          <Label color={is_active ? "success" : "error"}>
            {is_active ? "Đang hoạt động" : "Ngưng hoạt động"}
          </Label>
        </TableCell>

        <TableCell>
          <Label color={is_working ? "success" : "error"}>
            {is_working ? "Đang làm việc" : "Ngưng làm việc"}
          </Label>
        </TableCell>
{/* 
        <TableCell align="right">
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

UserTableRow.propTypes = {
  selected: PropTypes.any,
  employees_code: PropTypes.any,
  employee_image: PropTypes.any,
  employees_name: PropTypes.any,
  // email: PropTypes.any,
  // gender: PropTypes.any,
  // address: PropTypes.any,
  document_number: PropTypes.any,
  position_name: PropTypes.any,
  is_active: PropTypes.any,
  is_working: PropTypes.any,
  handleClick: PropTypes.func,
};
