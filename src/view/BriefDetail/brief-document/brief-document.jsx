import {
  Box,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import Label from "../../../components/Label/label";
import { useParams } from "react-router-dom";
import Iconify from "../../../components/Iconify";
import { useState } from "react";

export default function BriefDocument({ file, info }) {
  const { id } = useParams();
  const [open, setOpen] = useState(null);
  const [edit, setEdit] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleOpenEdit = (event) => {
    setOpen(event.currentTarget);
    setEdit(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setEdit(null);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    mt: 1,
    transform: "translate(-50%, -50%)",
    height: "95%",
    width: "90%",
    borderRadius: "10px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };
  return (
    <>
      {info?.map((i) => (
        <Grid container>
          <Grid item xs={12} sm={8} sx={{ mb: 3 }}>
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
        </Grid>
      ))}

      <Typography variant="h6">DANH SÁCH TÀI LIỆU</Typography>

      <TableContainer sx={{ minWidth: 960, mb: 10 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={40}>#</TableCell>
              <TableCell align="left">Tên tài liệu</TableCell>
              <TableCell align="left">Loại tài liệu</TableCell>
              <TableCell align="right">Ngày khởi tạo</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow
              sx={{
                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <TableCell>1</TableCell>
              <TableCell align="left">
                <Box sx={{ maxWidth: 560 }}>
                  {/* <Typography variant="subtitle2">
                            {b.ma_tai_san}
                          </Typography> */}
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    ĐỀ NGHỊ THẨM ĐỊNH VÀ PHÊ DUYỆT KHOẢN VAY
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="left">PDF</TableCell>
              <TableCell align="right">20/05/2024</TableCell>
              <TableCell align="right">
                <IconButton onClick={handleOpenMenu}>
                  <Iconify icon="carbon:view-filled"></Iconify>
                </IconButton>
                <IconButton onClick={handleOpenEdit}>
                  <Iconify icon="flowbite:edit-outline"></Iconify>
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <TableCell>2</TableCell>
              <TableCell align="left">
                <Box sx={{ maxWidth: 560 }}>
                  {/* <Typography variant="subtitle2">
                            {b.ma_tai_san}
                          </Typography> */}
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    {" "}
                    BÁO CÁO THẨM ĐỊNH VÀ ĐỀ NGHỊ PHÊ DUYỆT KHOẢN VAY
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="left">DOCX</TableCell>
              <TableCell align="right">12/06/2024</TableCell>
              <TableCell align="right">
                <IconButton onClick={handleOpenMenu}>
                  <Iconify icon="carbon:view-filled"></Iconify>
                </IconButton>
                <IconButton onClick={handleOpenEdit}>
                  <Iconify icon="flowbite:edit-outline"></Iconify>
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <TableCell>3</TableCell>
              <TableCell align="left">
                <Box sx={{ maxWidth: 560 }}>
                  {/* <Typography variant="subtitle2">
                            {b.ma_tai_san}
                          </Typography> */}
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    BÁO CÁO THẨM ĐỊNH TÀI SẢN NHÀ ĐẤT
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="left">PDF</TableCell>
              <TableCell align="right">15/06/2024</TableCell>
              <TableCell align="right">
                <IconButton onClick={handleOpenMenu}>
                  <Iconify icon="carbon:view-filled"></Iconify>
                </IconButton>
                <IconButton onClick={handleOpenEdit}>
                  <Iconify icon="flowbite:edit-outline"></Iconify>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleCloseMenu}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* {file ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                {file.file_name}
              </Typography>
              <iframe
                src={
                  (`https://view.officeapps.live.com/op/embed.aspx?src=` + file.file_url)
                }
                style={{
                  border: "none",
                  width: "100%",
                  height: "95%",
                }}
              ></iframe>
            </>
          ) : ( */}
          {edit ? (
            <iframe
              src={
                "https://docs.google.com/document/d/18H4i940POy3BOXcRQiX4FRtaf_fTRb5K/edit?usp=sharing&ouid=113901657240791455584&rtpof=true&sd=true"
              }
              style={{
                border: "none",
                width: "100%",
                height: "1000px",
              }}
            ></iframe>
          ) : (
            <iframe
              src={
                "https://view.officeapps.live.com/op/embed.aspx?src=https://res.cloudinary.com/dj3zy8ivi/raw/upload/v1716820988/B%C3%A1o_c%C3%A1o_k%E1%BA%BFt_qu%E1%BA%A3_th%E1%BA%A9m_%C4%91%E1%BB%8Bnh_gi%C3%A1_%C3%A1p_d%E1%BB%A5ng_cho_doanh_nghi%E1%BB%87p_th%E1%BA%A9m_%C4%91%E1%BB%8Bnh_gi%C3%A1_kpsndt.docx"
              }
              style={{
                border: "none",
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          )}

          {/* )
          } */}
        </Box>
      </Modal>
    </>
  );
}
