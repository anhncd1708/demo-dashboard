import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  CardContent,
  Grid,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getListCustomer,
  getListCustomerDetail,
  getListPersonalAppraisal,
} from "../../context/redux/action/action";
import Iconify from "../../components/Iconify/iconify";
import Scrollbar from "../../components/Scrollbar";
import Loading from "../../components/Loading/Loading";
import TableNoData from "../../components/Table/table-no-data";
import CustomerTableRow from "../../components/Table/customer-table/customer-table-row";
import UserTableHead from "../../components/Table/table-head";
import TableEmptyRows from "../../components/Table/table-empty-rows";
import UserTableToolbar from "../../components/Table/table-toolbar";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../../components/Table/utils";
import TableLoading from "../../components/Table/table-loading";
import AppraisalTableRow from "../../components/Table/appraisal-table/appraisal-table-row";
import PersonalAppraisalTableRow from "../../components/Table/personal-appraisal-table/personal-appraisal-table-row";
import { RouterLink } from "../../routes/components";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

// ----------------------------------------------------------------------

export default function PersonalCalcView() {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const callAPI = async () => {
      await dispatch(getListCustomerDetail(id));
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const customer = useSelector((state) => {
    console.log(26, state.customerDetail);
    return state.customerDetail;
  });

  const [tuoi, setTuoi] = useState();
  const [hocvan, setHocvan] = useState();
  const [taisan, setTaisan] = useState();
  const [thunhapchinh, setThunhapchinh] = useState();
  const [chitieu, setChitieu] = useState();
  const [chucvu, setChucvu] = useState();
  const [thoigiankd, setThoigiankd] = useState();
  const [thunhapkhac, setThunhapkhac] = useState();
  const [thunhapphu, setThunhapphu] = useState();
  const [lienket, setLienket] = useState();
  const [diachi, setDiachi] = useState();
  const [songuoiphuthuoc, setSonguoiphuthuoc] = useState();
  const [sinhsong, setSinhsong] = useState();
  const [nguoibaolanh, setNguoibaolanh] = useState();
  const [tindung, setTindung] = useState();

  const sum = () => {
    let sum =
      tuoi +
      hocvan +
      taisan +
      thunhapchinh +
      chitieu +
      chucvu +
      thoigiankd +
      thunhapkhac +
      lienket +
      diachi +
      songuoiphuthuoc +
      sinhsong +
      nguoibaolanh +
      tindung;
    return sum;
  };

  const handleCalculate = () => {
    let tongdiem = sum();
    if (tongdiem != undefined) {
      Swal.fire({
        title: "Tổng điểm",
        text: `Tổng số diểm :${tongdiem} `,
        confirmButtonText: "Xác nhận",
      });
    } else {
      Swal.fire({
        title: "Opps..",
        text: `Vui lòng điền đầy đủ`,
        confirmButtonText: "Xác nhận",
      });
    }
  };

  const handleSave = () => {
    let tongdiem = sum();
    Swal.fire({
      title: "Xác nhận lưu",
      text: `Tổng số diểm :${tongdiem} `,
      showCancelButton: true,
      cancelButtonText: `Hủy`,
      confirmButtonText: "Xác nhận",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: `Lưu điểm thành công`,
          confirmButtonText: "Xác nhận",
        });
      }
    });
  };

  return (
    <>
      <Button
        sx={{ width: 100 }}
        component={RouterLink}
        to={`/personal-appraisal/${id}`}
        color="inherit"
        startIcon={<Iconify icon="ep:back" />}
      ></Button>
      <Container>
        <Typography sx={{ textAlign: "center", mb: 2 }} variant="h4">
          Tính điểm thẩm định cá nhân
        </Typography>
        <Grid container>
          {customer?.map((c) => (
            <>
              <Grid xs={12} sm={12} sx={{ my: 2 }}>
                <Card sx={{ p: 5 }}>
                  <div className="d-flex">
                    <Typography
                      paragraph
                      variant="subtitle2"
                      sx={{ color: "text.disabled" }}
                    >
                      Khách hàng:
                    </Typography>
                    <Typography sx={{ mx: 2 }} paragraph variant="subtitle2">
                      {c.customer_name}
                    </Typography>
                  </div>
                </Card>
              </Grid>

              <Grid xs={12} sm={12} sx={{ my: 2 }}>
                <Card sx={{ p: 5 }}>
                  <Typography
                    sx={{ textAlign: "center", mb: 2 }}
                    variant="subtitle1"
                  >
                    TIÊU CHÍ CÁ NHÂN (40 ĐIỂM)
                  </Typography>
                  {/*------------------------- tuổi------------------------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Tuổi:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setTuoi(e.target.value)}
                        >
                          <MenuItem value={3.5}>Từ 20 đến 24</MenuItem>
                          <MenuItem value={4.5}>Từ 25 đến 34</MenuItem>
                          <MenuItem value={5}>Từ 35 đến 54</MenuItem>
                          <MenuItem value={4}>Từ 55 đến 70</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/*------------- trình độ học vấn------------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Trình độ học vấn:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setHocvan(e.target.value)}
                        >
                          <MenuItem value={5}>Trên Đại học</MenuItem>
                          <MenuItem value={4.5}>Đại học</MenuItem>
                          <MenuItem value={4}>Cao đẳng/Trung cấp</MenuItem>
                          <MenuItem value={3.5}>Phổ thông</MenuItem>
                          <MenuItem value={2.5}>Khác</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/*------------- Tình trạng sở hữu tài sản----------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Tình trạng sở hữu tài sản:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setTaisan(e.target.value)}
                        >
                          <MenuItem value={10}>Bất động sản</MenuItem>
                          <MenuItem value={9}>Xe ô tô, sổ tiết kiệm</MenuItem>
                          <MenuItem value={8}>
                            Giấy phép kinh doanh/Giấy chứng nhận cổ phiếu
                          </MenuItem>
                          <MenuItem value={7}>
                            Tài sản khác (Sạp chợ, Hợp đồng ủy quyền, xe
                            máy,...)
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/*-------------Thu nhập chính----------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Thu nhập chính:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setThunhapchinh(e.target.value)}
                        >
                          <MenuItem value={10}>Trên 15.000.000</MenuItem>
                          <MenuItem value={9}>
                            Từ 10.000.000 - 15.000.00
                          </MenuItem>
                          <MenuItem value={7}>
                            Từ 6.000.000 - 10.000.000
                          </MenuItem>
                          <MenuItem value={5}>Dưới 6.000.000</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/*-------------Chi tiêu hàng tháng----------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Chi tiêu hàng tháng:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setChitieu(e.target.value)}
                        >
                          <MenuItem value={10}>Trên 12.000.000</MenuItem>
                          <MenuItem value={9}>
                            Từ 10.000.000 - 12.000.000
                          </MenuItem>
                          <MenuItem value={7}>
                            Từ 6.000.000 - 10.000.000
                          </MenuItem>
                          <MenuItem value={5}>Dưới 5.000.000</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid xs={12} sm={12} sx={{ my: 2 }}>
                <Card sx={{ p: 5 }}>
                  <Typography
                    sx={{ textAlign: "center", mb: 2 }}
                    variant="subtitle1"
                  >
                    TIÊU CHÍ QUAN HỆ XÃ HỘI (30 ĐIỂM)
                  </Typography>
                  {/*--------------- Chức vụ/nghề nghiệp/Chủ cơ sở-----------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Chức vụ/nghề nghiệp/Chủ cơ sở
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setChucvu(e.target.value)}
                        >
                          <MenuItem value={5}>
                            Cấp quản lý, điều hành/ Chủ cơ sở
                          </MenuItem>
                          <MenuItem value={4}>
                            Cấp chuyên viên, Cán bộ, Viên chức
                          </MenuItem>
                          <MenuItem value={3}>
                            Lao động được đào tạo nghề, công nhân
                          </MenuItem>
                          <MenuItem value={2.5}>Kinh doanh tự do</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/*-------------Thời gian làm việc/ kinh doanh------------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Thời gian làm việc/ kinh doanh:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setThoigiankd(e.target.value)}
                        >
                          <MenuItem value={8}>Trên 5 năm</MenuItem>
                          <MenuItem value={7.2}>Từ 3 - 5 năm</MenuItem>
                          <MenuItem value={5.6}>Từ 1- 3 năm</MenuItem>
                          <MenuItem value={4}> Ít hơn 1 năm</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/*-------------Thu nhập khác----------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Thu nhập khác:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setThunhapkhac(e.target.value)}
                        >
                          <MenuItem value={7}>Cho thuê nhà, đất</MenuItem>
                          <MenuItem value={6.3}>
                            Cho thuê xe,Sổ tiết kiệm
                          </MenuItem>
                          <MenuItem value={4.9}>Khác</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/*-------------Thu nhập của người đồng trách nhiệm------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Thu nhập của người đồng trách nhiệm:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setThunhapphu(e.target.value)}
                        >
                          <MenuItem value={5}>
                            Cho thuê nhà, cho thuê xe
                          </MenuItem>
                          <MenuItem value={4}>Lương và phụ cấp</MenuItem>
                          <MenuItem value={3}>Kinh doanh tự do</MenuItem>
                          <MenuItem value={2.5}>Khác</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Liên kết xã hội, cộng đồng:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setLienket(e.target.value)}
                        >
                          <MenuItem value={3}>
                            Sử dụng email/Zalo/Viber/Facbook,…
                          </MenuItem>
                          <MenuItem value={4}>
                            Thành viên trong các hội, đoàn, Nhóm,…
                          </MenuItem>
                          <MenuItem value={5}>
                            Thông qua UBND Phường, CTV, đầu mối,…
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid xs={12} sm={12} sx={{ my: 2 }}>
                <Card sx={{ p: 5 }}>
                  <Typography
                    sx={{ textAlign: "center", mb: 2 }}
                    variant="subtitle1"
                  >
                    TIÊU CHÍ THÂN NHÂN (20 ĐIỂM)
                  </Typography>
                  {/*---------------Thời gian ở địa chỉ hiện tại-----------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Thời gian ở địa chỉ hiện tại:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setDiachi(e.target.value)}
                        >
                          <MenuItem value={5}>Trên 5 năm</MenuItem>
                          <MenuItem value={4}>Từ 2 - 5 năm</MenuItem>
                          <MenuItem value={3}>Bé hơn 2 năm</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/*-------------Số người phụ thuộc------------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Số người phụ thuộc:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setSonguoiphuthuoc(e.target.value)}
                        >
                          <MenuItem value={4}>0</MenuItem>
                          <MenuItem value={4.5}>1</MenuItem>
                          <MenuItem value={5}>2</MenuItem>
                          <MenuItem value={2.5}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/*-------------Sinh sống tại nhà riêng/Cùng gia đình/Thuê----------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Sinh sống tại nhà riêng/Cùng gia đình/Thuê:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setSinhsong(e.target.value)}
                        >
                          <MenuItem value={5}>Nhà riêng</MenuItem>
                          <MenuItem value={4}>Sống cùng gia đình</MenuItem>
                          <MenuItem value={3.5}>Nhà cơ quan</MenuItem>
                          <MenuItem value={2.5}>Nhà thuê</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  {/*-------------Người bảo lãnh/Đồng trách nhiệm----------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Người bảo lãnh/Đồng trách nhiệm:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setNguoibaolanh(e.target.value)}
                        >
                          <MenuItem value={5}>Vợ/chồng</MenuItem>
                          <MenuItem value={4}>Ba/Mẹ</MenuItem>
                          <MenuItem value={3.5}>Con/Anh chị Em ruột</MenuItem>
                          <MenuItem value={2.5}>Người quen</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid xs={12} sm={12} sx={{ my: 2 }}>
                <Card sx={{ p: 5 }}>
                  <Typography
                    sx={{ textAlign: "center", mb: 2 }}
                    variant="subtitle1"
                  >
                    TIÊU CHÍ QUAN HỆ TÍN DỤNG (10 ĐIỂM)
                  </Typography>
                  {/*---------------TÍN DỤNG-----------------*/}
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        paragraph
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        Lịch sử vay vốn:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                        <Select
                          defaultValue={0}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={(e) => setTindung(e.target.value)}
                        >
                          <MenuItem value={7}>Chưa vay</MenuItem>
                          <MenuItem value={10}>Vay 1 ngân hàng</MenuItem>
                          <MenuItem value={8}>Vay 2 ngân hàng</MenuItem>
                          <MenuItem value={6}>Vay trên 2 ngân hàng</MenuItem>
                          <MenuItem value={-5}>Lịch sử nợ quá hạn</MenuItem>
                          <MenuItem value={-10}>Lịch sử nợ xấu</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={7}></Grid>
          <Grid item xs={12} sm={5} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleCalculate}
            >
              Tính điểm
            </Button>
            <Button
              sx={{ mx: 1 }}
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleSave}
            >
              Lưu
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
