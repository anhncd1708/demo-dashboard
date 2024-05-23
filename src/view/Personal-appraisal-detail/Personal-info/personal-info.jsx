import { useState, useEffect } from "react";
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
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListBriefSuperDetail } from "../../../context/redux/action/action";
import moment from "moment";
import ava from "../../../assets/avatar/avatar_9.jpg";
import Label from "../../../components/Label/label";
import Iconify from "../../../components/Iconify";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link } from "react-router-dom";
import { RouterLink } from "../../../routes/components";
// ----------------------------------------------------------------------

export default function PersonalInfo({ customer, assets, id }) {
  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {customer?.map((c) => (
        <>
          <Typography
            sx={{ textAlign: "center" }}
            key={c.customer_code}
            variant="h4"
          >
            Thông tin khách hàng
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={7}>
              <Avatar src={ava} sx={{ width: 80, height: 80, m: 2 }}>
                A
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={5} sx={{ textAlign: "right" }}>
              <Button
                sx={{ m: 5 }}
                component={RouterLink}
                to={`/personal-appraisal/${id}/calc`}
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Tính điểm hồ sơ
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={7}>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Tên khách hàng:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    {c.customer_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Mã khách hàng:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    {c.customer_code}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Ngày sinh:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    {moment(c.date_of_birth).format("DD/MM/YYYY")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Giới tính:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    {c.gender ? "Nam" : "Nữ"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Địa chỉ:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    {c.adress}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Số điện thoại:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    {c.telephone}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    {c.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Website:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    {c.website}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Giấy tờ:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    {c.personal_documents_type} số {c.personal_document_number},
                    cấp ngày{" "}
                    {moment(c.personal_document_issue_date).format(
                      "DD/MM/YYYY"
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Theo diện:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    <Label
                      color={c.is_organize ? "success" : "info"}
                      sx={{ textTransform: "uppercase", mb: 1 }}
                    >
                      {c.is_organize ? "Tổ chức" : "Cá nhân"}
                    </Label>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Công việc:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    <Label
                      color={c.is_working ? "success" : "warning"}
                      sx={{ textTransform: "uppercase", mb: 1 }}
                    >
                      {c.is_working ? "Có việc làm" : "Chưa có việc làm"}
                    </Label>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    variant="subtitle2"
                    sx={{ color: "text.disabled" }}
                  >
                    Ngày tạo:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography paragraph variant="body2">
                    {moment(c.create_date).format("DD/MM/YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ m: 2 }}>
            Danh sách tài sản
          </Typography>
          <TabContext value={value}>
            <Box sx={{ px: 3 }}>
              <TabList onChange={handleChange}>
                {assets?.map((a, index) => (
                  <Tab disableRipple value={index} label={a.ma_tai_san} />
                ))}
              </TabList>
            </Box>

            <Divider />
            {assets?.map((a, index) => (
              <TabPanel value={index}>
                <Card>
                  <TableContainer sx={{ minWidth: 960 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell width={40}>#</TableCell>
                          <TableCell align="left">Tên tài sản</TableCell>
                          <TableCell align="left">Loại tài sản</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableRow
                          sx={{
                            borderBottom: (theme) =>
                              `solid 1px ${theme.palette.divider}`,
                          }}
                        >
                          <TableCell>#</TableCell>
                          <TableCell align="left">
                            <Box sx={{ maxWidth: 350 }}>
                              <Typography variant="subtitle2">
                                {a.ma_tai_san}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                                noWrap
                              >
                                {a.mo_ta_tai_san}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box sx={{ maxWidth: 350 }}>
                              <Typography variant="subtitle2">
                                {a.asset_type_code}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                                noWrap
                              >
                                {a.asset_type_name}
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            borderBottom: (theme) =>
                              `solid 1px ${theme.palette.divider}`,
                          }}
                        >
                          <TableCell>#</TableCell>
                          <TableCell align="left">
                            <Box sx={{ maxWidth: 500 }}>
                              <Typography variant="subtitle2">Mô tả</Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                                noWrap
                              >
                                {a.descriptionz}
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </TabPanel>
            ))}
          </TabContext>
        </>
      ))}
    </>
  );
}
