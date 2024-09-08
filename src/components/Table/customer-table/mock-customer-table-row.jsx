import { useState } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  Popover,
  TableRow,
  MenuItem,
  TableCell,
  Typography,
  IconButton,
} from "@mui/material";
import Iconify from "../../Iconify/iconify";

export default function MockCustomerTableRow({
  selected,
  id,
  name,
  gender,
  membershipNumber,
  phone,
  email,
  handleClick,
  onEdit,
  onDelete,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    onEdit(id);
    handleCloseMenu();
  };

  const handleDelete = () => {
    onDelete(id);
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{id}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{membershipNumber}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{email}</TableCell>
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
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

MockCustomerTableRow.propTypes = {
  selected: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.string,
  membershipNumber: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  handleClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
