import { useState } from "react";

import {
  Slide,
  Input,
  Button,
  styled,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";

import { bgBlur } from "../../../theme/css";

import Iconify from "../../Iconify/iconify";

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled("div")(({ theme }) => ({
  ...bgBlur({
    color: theme.palette.background.default,
  }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up("md")]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [openSearch, setOpenSearch] = useState(false);

  const handleOpen = () => {
    setOpenSearch(!openSearch);
  };

  const handleClose = () => {
    setOpenSearch(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!openSearch && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={openSearch} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
