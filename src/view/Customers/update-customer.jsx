import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { fetchCustomer, updateCustomer } from "../../mock/fakeAPI/customerAPI";

function ImageUpload({ title, initialImage }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialImage);

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
          {selectedFile || initialImage ? "Chọn file khác" : "Chọn file"}
        </Button>
      </label>
    </Box>
  );
}

export default function UpdateCustomer() {
  const { customerId } = useParams();
  console.log("customerId:", customerId);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        setLoading(true);
        console.log("Attempting to fetch customer with ID:", customerId);
        const data = await fetchCustomer(customerId);
        console.log("Fetched customer data:", data);
        setCustomer(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching customer:", err);
        setError("Failed to load customer data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCustomer();
  }, [customerId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const updatedCustomer = await updateCustomer(customerId, customer);
      setCustomer(updatedCustomer);
      alert("Customer updated successfully!");
    } catch (err) {
      setError("Failed to update customer. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!customer) return <Typography>Customer not found</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 1000, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Cập nhật khách hàng
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Thông tin cá nhân
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên khách hàng"
                variant="outlined"
                name="name"
                value={customer.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số thẻ thành viên"
                variant="outlined"
                name="membershipNumber"
                value={customer.membershipNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Giới tính</InputLabel>
                <Select
                  label="Giới tính"
                  name="gender"
                  value={customer.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ liên lạc"
                variant="outlined"
                name="contactAddress"
                value={customer.contactAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ cư trú"
                variant="outlined"
                name="residentialAddress"
                value={customer.residentialAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa bàn cư trú"
                variant="outlined"
                name="residentialArea"
                value={customer.residentialArea}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Điện thoại"
                variant="outlined"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={customer.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid className="mt-2" container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Ghi chú
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                placeholder="Thêm ghi chú..."
                name="notes"
                value={customer.notes}
                onChange={handleChange}
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
              <ImageUpload
                title="Mặt trước"
                initialImage={customer.frontIdImage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Mặt sau
              </Typography>
              <ImageUpload
                title="Mặt sau"
                initialImage={customer.backIdImage}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Thông tin giấy tờ
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số giấy tờ"
                variant="outlined"
                name="idNumber"
                value={customer.idNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Loại giấy tờ</InputLabel>
                <Select
                  label="Loại giấy tờ"
                  name="idType"
                  value={customer.idType}
                  onChange={handleChange}
                >
                  <MenuItem value="CMND">CMND</MenuItem>
                  <MenuItem value="CCCD">CCCD</MenuItem>
                  <MenuItem value="GPKD">GPKD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nơi cấp"
                variant="outlined"
                name="idIssuePlace"
                value={customer.idIssuePlace}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày cấp"
                variant="outlined"
                type="date"
                name="idIssueDate"
                value={customer.idIssueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày hết hạn"
                variant="outlined"
                type="date"
                name="idExpiryDate"
                value={customer.idExpiryDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Chữ ký
          </Typography>
          <ImageUpload
            title="Chữ ký khách hàng"
            initialImage={customer.signatureImage}
          />

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" color="primary">
              Cập nhật khách hàng
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
