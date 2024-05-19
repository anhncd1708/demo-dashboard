import { useState, useEffect } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card,
  Stack,
  Box,
  Tab,
  Container,
  Divider,
  styled,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Label from "../../../components/Label/label";
import Scrollbar from "../../../components/Scrollbar";
import moment from "moment";
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(0, 2),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("md")]: { display: "flex", alignItems: "center" },
  "&:hover": {
    zIndex: 999,
    position: "relative",
    boxShadow: theme.customShadows.z24,
    "& .showActions": { opacity: 1 },
  },
}));

const WrapStyle = styled(Link)(({ theme }) => ({
  minWidth: 0,
  display: "flex",
  padding: theme.spacing(2, 0),
  transition: theme.transitions.create("padding"),
}));

export default function DocumentItems({
  id,
  date_create,
  file_name,
  file_type,
  file_url,
}) {
  return (
    <>
      <RootStyle key={id}>
        <WrapStyle color="inherit" underline="none">
          <Avatar>Avatar</Avatar>
          <Box
            sx={{
              ml: 2,
              minWidth: 0,
              alignItems: "center",
              display: { md: "flex" },
            }}
          >
            <Typography
              variant="body2"
              noWrap
              sx={{
                pr: 2,
                minWidth: 200,
              }}
            >
              {file_name}
            </Typography>

            <Typography
              noWrap
              variant="body2"
              sx={{
                pr: 2,
              }}
            >
              <Box component="span">{file_type}</Box>
              <Box component="span">message</Box>
            </Typography>
          </Box>
        </WrapStyle>
      </RootStyle>
    </>
  );
}

DocumentItems.propTypes = {
  id: PropTypes.any,
  date_create: PropTypes.any,
  file_name: PropTypes.any,
  file_type: PropTypes.any,
  file_url: PropTypes.any,
};
