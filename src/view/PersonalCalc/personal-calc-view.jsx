import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getListCustomerDetail,
  getListInternalCreditCriterias,
  getListRootInternalCreditCriterias,
  getListSubInternalCreditCriterias
} from "../../context/redux/action/action";
import Iconify from "../../components/Iconify/iconify";

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
      await dispatch(getListInternalCreditCriterias());
      await dispatch(getListRootInternalCreditCriterias());
      await dispatch(getListSubInternalCreditCriterias());
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const customer = useSelector((state) => {
    console.log(47, state.customerDetail);
    return state.customerDetail;
  });

  const internalCreditCriterias = useSelector((state) => {
    console.log(52, state.internalCreditCriterias);
    return state.internalCreditCriterias;
  });

  const rootInternalCreditCriterias = useSelector((state) => {
    console.log(57, state.rootInternalCreditCriterias);
    return state.rootInternalCreditCriterias;
  });

  const subInternalCreditCriterias = useSelector((state) => {
    console.log(62, state.subInternalCreditCriterias);
    return state.subInternalCreditCriterias;
  });

  const [tuoi, setTuoi] = useState("");
  const [hocvan, setHocvan] = useState("");
  const [taisan, setTaisan] = useState("");
  const [thunhapchinh, setThunhapchinh] = useState("");
  const [chitieu, setChitieu] = useState("");
  const [chucvu, setChucvu] = useState("");
  const [thoigiankd, setThoigiankd] = useState("");
  const [thunhapkhac, setThunhapkhac] = useState("");
  const [thunhapphu, setThunhapphu] = useState("");
  const [lienket, setLienket] = useState("");
  const [diachi, setDiachi] = useState("");
  const [songuoiphuthuoc, setSonguoiphuthuoc] = useState("");
  const [sinhsong, setSinhsong] = useState("");
  const [nguoibaolanh, setNguoibaolanh] = useState("");
  const [tindung, setTindung] = useState("");

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
      />
      <div className="p-4">
        <Typography sx={{ textAlign: "center", mb: 2 }} variant="h4">
          Tính điểm thẩm định cá nhân
        </Typography>
        <Grid spacing={3} container>

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
            </>
          ))}

          {internalCreditCriterias?.map((a) => (
            <>
              <Grid xs={6} sm={6} sx={{ my: 1, px: 1 }}>
                <Card sx={{ p: 5 }}>
                  <Typography
                    sx={{ textAlign: "center", mb: 2 }}
                    variant="subtitle1"
                  >
                    {/* {a.ma_loai_tieu_chi} - */}
                    {a?.loai_tieu_chi}
                  </Typography>

                  {rootInternalCreditCriterias?.map((b) => (
                    <Grid key={b?.ID} container>

                      {b?.ma_loai_tieu_chi_tin_dung === a?.ma_loai_tieu_chi ? (
                        <>
                          <Grid item xs={6} sm={6}>
                            <Typography
                              paragraph
                              variant="subtitle2"
                              sx={{ color: "text.disabled" }}
                            >

                              {b?.loai_tieu_chi}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl sx={{ m: 1, width: 300 }} size="small">
                              <Select
                                key={b?.ID}
                                defaultValue={0}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                onChange={(e) => setTuoi(e.target.value)}
                              >
                                {subInternalCreditCriterias?.map((c) => (
                                  c?.ma_loai_tieu_chi === b?.ma_loai_tieu_chi &&
                                  <MenuItem value={c.ma_tieu_chi}>{c.ten_tieu_chi}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>


                        </>)
                        : (
                          <>
                          </>
                        )}

                    </Grid >
                  ))}
                  {/* end of internal */}
                </Card >
              </Grid >
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
      </div >
    </>
  );
}
