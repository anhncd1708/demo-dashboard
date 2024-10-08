import { startTransition, useState } from "react";
import Cookies from "js-cookie";
import {
  alpha,
  Box,
  Avatar,
  Divider,
  Popover,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";

import { useRouter } from "../../../routes/hooks";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Trang chủ",
    icon: "eva:home-fill",
  },
  {
    label: "Trang cá nhân",
    icon: "eva:person-fill",
  },
  {
    label: "Cài đặt",
    icon: "eva:settings-2-fill",
  },
];

// mock account info
const account = {
  displayName: "Admin",
  email: "admin@gmail.com",
  photoURL: "../../assets/avatar/avatar_9.jpg",
};

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const router = useRouter();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const user = JSON.parse(Cookies.get("user"))

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    startTransition(() => {
      router.push("/login");
    });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account?.photoURL}
          alt={account?.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account?.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.employees_name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          Đăng xuất
        </MenuItem>
      </Popover>
    </>
  );
}
