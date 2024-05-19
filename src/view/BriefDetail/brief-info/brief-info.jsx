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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListBriefSuperDetail } from "../../../context/redux/action/action";
import { useParams } from "react-router-dom";
import Label from "../../../components/Label/label";
import Scrollbar from "../../../components/Scrollbar";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import moment from "moment";
// ----------------------------------------------------------------------

export default function BriefInfo({ detail, info }) {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   setLoading(true);
  //   const callAPI = async () => {
  //     await dispatch(getListBriefSuperDetail(`${id}`));
  //     setLoading(false);
  //   };
  //   callAPI();
  // }, [dispatch]);

  // const briefDetail = useSelector((state) => {
  //   console.log(27, state.briefDetail);
  //   return state.briefDetail;
  // });

  const RowResultStyle = styled(TableRow)(({ theme }) => ({
    "& td": {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  }));

  return (
    <>
      {info?.map((i) => (
        <Grid container>
          <Grid item xs={12} sm={8} sx={{ mb: 5 }}>
            <div className="d-flex">
              <Typography variant="h4">{i.muc_dich_tham_dinh}</Typography>
              <Typography variant="h4" sx={{ color: "text.disabled", mx: 2 }}>
                {id}
              </Typography>
            </div>
            <Typography variant="subtitle1">
              Thời gian thẩm đinh:{" "}
              {moment(i.thoi_gian_tham_dinh).format("DD/MM/YYYY")}
            </Typography>
            <Box>
              <Label
                color={i.da_duyet ? "success" : "warning"}
                sx={{ textTransform: "uppercase", mb: 1 }}
              >
                {i.da_duyet ? "Đã duyệt" : "Chưa duyệt"}
              </Label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mb: 5 }}>
            <div className="d-flex ">
              <Typography
                paragraph
                variant="overline"
                sx={{ color: "text.disabled" }}
              >
                Thông tin nhân viên tiếp nhận
              </Typography>
              <Typography
                sx={{ color: "text.disabled", mx: 2 }}
                variant="caption"
              >
                NV00X
              </Typography>
            </div>
            <Typography variant="body2">{i.employee_approval}</Typography>
            <Typography variant="body2">
              Vị trí: Chuyên Gia Pháp Lý (Legal Expert)
            </Typography>
            <Typography variant="body2">
              Ngày tiếp nhận hồ sơ: {moment(i.create_date).format("DD/MM/YYYY")}
            </Typography>
          </Grid>
        </Grid>
      ))}

      {detail?.map((b) => (
        <>
          <Card key={b.ma_ho_so_ho_so_tham_dinh} sx={{ pt: 5, px: 5 }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                <div className="d-flex">
                  <Typography
                    paragraph
                    variant="h6"
                    sx={{ color: "text.disabled" }}
                  >
                    Chi tiết hồ sơ thẩm định
                  </Typography>
                  <Typography
                    paragraph
                    variant="h6"
                    sx={{ color: "text.disabled", mx: 2 }}
                  >
                    {b.ma_chi_tiet_chi_tiet_ho_so_tham_dinh}
                  </Typography>
                </div>
                <div className="d-flex ">
                  <Typography
                    paragraph
                    variant="overline"
                    sx={{ color: "text.disabled" }}
                  >
                    Thông tin khách hàng
                  </Typography>
                  <Typography
                    sx={{ color: "text.disabled", mx: 2 }}
                    variant="caption"
                  >
                    {b.customer_code}
                  </Typography>
                </div>

                <Typography variant="body2">{b.customer_name}</Typography>
                <Typography variant="body2">
                  Địa chỉ: {b.customer_adress}
                </Typography>
                <Typography variant="body2">
                  Liên hệ: {b.customer_contact_person_telephone} ,{" "}
                  {b.customer_contact_person}
                </Typography>
              </Grid>
            </Grid>

            <Scrollbar>
              <TableContainer sx={{ minWidth: 960 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width={40}>#</TableCell>
                      <TableCell align="left">Tài sản thẩm định</TableCell>
                      <TableCell align="left">Giá trị thẩm định</TableCell>
                      <TableCell align="right">Chi phí thẩm định</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow
                      sx={{
                        borderBottom: (theme) =>
                          `solid 1px ${theme.palette.divider}`,
                      }}
                    >
                      <TableCell>1</TableCell>
                      <TableCell align="left">
                        <Box sx={{ maxWidth: 560 }}>
                          <Typography variant="subtitle2">
                            {b.ma_tai_san}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                            noWrap
                          >
                            {b.mo_ta_tai_san}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        {b.so_tien_chi_tiet_ho_so_tham_dinh.toLocaleString() +
                          " VND"}
                      </TableCell>
                      <TableCell align="right">
                        {b.chi_phi_tham_dinh_chi_tiet_ho_so_tham_dinh.toLocaleString() +
                          " VND"}
                      </TableCell>
                    </TableRow>

                    <RowResultStyle>
                      <TableCell colSpan={2} />
                      <TableCell align="right">
                        <Box sx={{ mt: 2 }} />
                        <Typography variant="body1">
                          Ngày định giá tài sản
                        </Typography>
                      </TableCell>
                      <TableCell align="right" width={120}>
                        <Box sx={{ mt: 2 }} />
                        <Typography variant="body1">
                          {moment(b.ngay_dinh_gia_tai_san).format("DD/MM/YYYY")}
                        </Typography>
                      </TableCell>
                    </RowResultStyle>
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <Divider sx={{ mt: 5 }} />
            {/* 
            <Grid container>
              <Grid item xs={12} md={9} sx={{ py: 3 }}>
                <Typography variant="subtitle2">ĐỘ ƯU TIÊN</Typography>
                <Typography variant="body2">{b.priority_name}</Typography>
              </Grid>
            </Grid> */}
          </Card>
        </>
      ))}
    </>
  );
}
