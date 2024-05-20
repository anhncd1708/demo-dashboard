import Container from "@mui/material/Container";
import {
  Card,
  Stack,
  Table,
  Button,
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
// ----------------------------------------------------------------------

export default function LoanEntrustmentView() {
  return (
    <>
      <Container maxWidth="xl">
        <h2>Ủy thác cho vay</h2>
      </Container>

      <Grid xs={12} sm={12} sx={{ my: 2 }}>
        <Card sx={{ p: 5 }}>
          <Typography sx={{ textAlign: "center", mb: 2 }} variant="subtitle1">
            Thêm hợp đồng vay vốn
          </Typography>
          {/*-------------------------Nhóm khách hàng------------------------------*/}
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography
                paragraph
                variant="subtitle2"
                sx={{ color: "text.disabled" }}
              >
                Nhóm khách hàng:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                <Select
                // defaultValue={0}
                // displayEmpty
                // inputProps={{ "aria-label": "Without label" }}
                // onChange={(e) => setTuoi(e.target.value)}
                >
                  <MenuItem value={3.5}>Từ 20 đến 24</MenuItem>
                  <MenuItem value={4.5}>Từ 25 đến 34</MenuItem>
                  <MenuItem value={5}>Từ 35 đến 54</MenuItem>
                  <MenuItem value={4}>Từ 55 đến 70</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/*-------------Mục đích vay------------------*/}
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography
                paragraph
                variant="subtitle2"
                sx={{ color: "text.disabled" }}
              >
                Mục đích vay:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                <Select
                // defaultValue={0}
                // displayEmpty
                // inputProps={{ "aria-label": "Without label" }}
                // onChange={(e) => setHocvan(e.target.value)}
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

          {/*------------- Chu kỳ trả----------------*/}
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography
                paragraph
                variant="subtitle2"
                sx={{ color: "text.disabled" }}
              >
                Chu kỳ trả:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                <Select
                // defaultValue={0}
                // displayEmpty
                // inputProps={{ "aria-label": "Without label" }}
                // onChange={(e) => setTaisan(e.target.value)}
                >
                  <MenuItem value={10}>Bất động sản</MenuItem>
                  <MenuItem value={9}>Xe ô tô, sổ tiết kiệm</MenuItem>
                  <MenuItem value={8}>
                    Giấy phép kinh doanh/Giấy chứng nhận cổ phiếu
                  </MenuItem>
                  <MenuItem value={7}>
                    Tài sản khác (Sạp chợ, Hợp đồng ủy quyền, xe máy,...)
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/*-------------Loại hình----------------*/}
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography
                paragraph
                variant="subtitle2"
                sx={{ color: "text.disabled" }}
              >
                Loại hình:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                <Select
                // defaultValue={0}
                // displayEmpty
                // inputProps={{ "aria-label": "Without label" }}
                // onChange={(e) => setThunhapchinh(e.target.value)}
                >
                  <MenuItem value={10}>Trên 15.000.000</MenuItem>
                  <MenuItem value={9}>Từ 10.000.000 - 15.000.00</MenuItem>
                  <MenuItem value={7}>Từ 6.000.000 - 10.000.000</MenuItem>
                  <MenuItem value={5}>Dưới 6.000.000</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/*-------------Chu kỳ lãi----------------*/}
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography
                paragraph
                variant="subtitle2"
                sx={{ color: "text.disabled" }}
              >
                Chu kỳ lãi:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                <Select
                // defaultValue={0}
                // displayEmpty
                // inputProps={{ "aria-label": "Without label" }}
                // onChange={(e) => setChitieu(e.target.value)}
                >
                  <MenuItem value={10}>Trên 12.000.000</MenuItem>
                  <MenuItem value={9}>Từ 10.000.000 - 12.000.000</MenuItem>
                  <MenuItem value={7}>Từ 6.000.000 - 10.000.000</MenuItem>
                  <MenuItem value={5}>Dưới 5.000.000</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/*-------------Ngành kinh tế----------------*/}
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography
                paragraph
                variant="subtitle2"
                sx={{ color: "text.disabled" }}
              >
                Ngành kinh tế:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
                <Select
                // defaultValue={0}
                // displayEmpty
                // inputProps={{ "aria-label": "Without label" }}
                // onChange={(e) => setChitieu(e.target.value)}
                >
                  <MenuItem value={10}>Trên 12.000.000</MenuItem>
                  <MenuItem value={9}>Từ 10.000.000 - 12.000.000</MenuItem>
                  <MenuItem value={7}>Từ 6.000.000 - 10.000.000</MenuItem>
                  <MenuItem value={5}>Dưới 5.000.000</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}
