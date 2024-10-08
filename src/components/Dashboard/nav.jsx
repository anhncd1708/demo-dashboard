import { useEffect } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/logo/logo-web-2.png"

import {
  Box,
  Stack,
  Drawer,
  Button,
  Avatar,
  alpha,
  Typography,
  ListItemButton,
  ListSubheader,
  List,
} from "@mui/material";

import { usePathname } from "../../routes/hooks";
import { RouterLink } from "../../routes/components";

import { useResponsive } from "../../hooks/use-responsive";

import Scrollbar from "../Scrollbar";

import { NAV } from "./Header/config-layout";
// import navConfig from "./config-navigation";

import { navData } from "../../util/Constants";
import Cookies from "js-cookie";
import Logo from "../Logo/Logo";

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const account = {
    id: 1,
    username: "admin",
    password: "admin",
    fullname: "Admin",
    created_at: "2024-05-01T00:00:00",
    updated_at: "2024-05-01T00:00:00",
    deleted_at: "2024-05-01T00:00:00",
    role: "ADMIN",
    email: "admin@gmail.com",
    active: true,
    photoURL: "../../assets/avatar/avatar_9.jpg",
  };

  const user = JSON.parse(Cookies.get("user"))

  console.log(user)

  const pathname = usePathname();

  const upLg = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={user.employee_image} alt={user.employees_name} />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{user.employees_name}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navData.map((item) =>
        item.subItems ? (
          <List
            sx={{
              minHeight: 44,
              borderRadius: 0.75,
              typography: "body2",
              textTransform: "capitalize",
              fontWeight: "fontWeightMedium",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                sx={{
                  minHeight: 44,
                  borderRadius: 0.75,
                  backgroundColor: "transparent",
                  textTransform: "capitalize",
                  fontWeight: "fontWeightMedium",
                }}
                component="div"
                id="nested-list-subheader"
              >
                {item.label}
              </ListSubheader>
            }
          >
            {item.subItems.map((subItem, subIndex) => (
              <NavItem key={subIndex} item={subItem} />
            ))}
          </List>
        ) : (
          <NavItem key={item.label} item={item} />
        )
      )}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} name={true} />

      {/* <img src={logo} alt="Logo" style={{ width: 50, height: 50, padding: 10 }} /> */}


      <div className="mt-4">
        {renderMenu}
      </div>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Box component="span">{item.label} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
