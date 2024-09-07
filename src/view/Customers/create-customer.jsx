import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function ImageUpload({ title }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        border: "2px dashed #ccc",
        borderRadius: 2,
        p: 3,
        textAlign: "center",
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      ) : (
        <>
          <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main" }} />
          <Typography>{title}</Typography>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id={`file-upload-${title}`}
      />
      <label htmlFor={`file-upload-${title}`}>
        <Button variant="text" color="primary" component="span">
          {selectedFile ? "Chọn file khác" : "Chọn file"}
        </Button>
      </label>
    </Box>
  );
}

export default function CreateCustomer() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Tạo khách hàng
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin cá nhân
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Tên khách hàng" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Số thẻ thành viên" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Giới tính</InputLabel>
              <Select label="Gender">
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Địa chỉ liên lạc" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Địa chỉ cư trú" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa bàn cư trú: (P.An Khánh, An Phú, Thảo Điền, Thủ Thiêm, An Lợi Đông, khác)"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Điện thoại" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" variant="outlined" />
          </Grid>
        </Grid>

        <Grid className="mt-2" container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Ghi chú
            </Typography>
            {/* Add rich text editor component here */}
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              placeholder="Thêm ghi chú..."
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              CMND/CCCD/GPKD
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Mặt trước
            </Typography>
            <ImageUpload title="Mặt trước" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Mặt sau
            </Typography>
            <ImageUpload title="Mặt sau" />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Thông tin giấy tờ
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Số giấy tờ" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Loại giấy tờ</InputLabel>
              <Select label="Gender">
                <MenuItem value="male">CMND</MenuItem>
                <MenuItem value="female">CCCD</MenuItem>
                <MenuItem value="female">GPKD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Nơi cấp" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Ngày cấp" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Ngày hết hạn" variant="outlined" />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Chữ ký
        </Typography>
        <ImageUpload title="Chữ ký khách hàng" />

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary">
            Tạo khách hàng
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
