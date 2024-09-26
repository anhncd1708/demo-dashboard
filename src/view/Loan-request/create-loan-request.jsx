import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import DocumentUpload from "./document-upload"; // Assuming you have this component

export default function CreateLoanRequest({ onComplete }) {
  const [formData, setFormData] = useState({
    customerName: "",
    membershipNumber: "",
    phoneNumber: "",
    email: "",
    loanAmount: "",
    loanTerm: "",
    loanPurpose: "",
    assetType: "",
    assetValue: "",
    assetDescription: "",
    notes: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    const requiredFields = [
      "customerName",
      "membershipNumber",
      "phoneNumber",
      "email",
      "loanAmount",
      "loanTerm",
      "loanPurpose",
      "assetType",
      "assetValue",
      "assetDescription",
    ];

    const allFieldsFilled = requiredFields.every(field => formData[field].trim() !== "");
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAttachmentsChange = (files) => {
    setAttachments(files);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      onComplete({ ...formData, attachments });
    } else {
      // Optionally, you can add an error message or alert here
      console.log("Please fill all required fields");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1000, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Tạo yêu cầu vay
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin khách hàng
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Tên khách hàng"
              variant="outlined"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Số thẻ thành viên"
              variant="outlined"
              name="membershipNumber"
              value={formData.membershipNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Số điện thoại"
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Thông tin khoản vay
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Số tiền vay (VND)"
              variant="outlined"
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Thời hạn vay (tháng)"
              variant="outlined"
              type="number"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Mục đích vay"
              variant="outlined"
              multiline
              rows={3}
              name="loanPurpose"
              value={formData.loanPurpose}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Tài sản thế chấp
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Loại tài sản"
              variant="outlined"
              name="assetType"
              value={formData.assetType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Giá trị ước tính (VND)"
              variant="outlined"
              type="number"
              name="assetValue"
              value={formData.assetValue}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Mô tả tài sản"
              variant="outlined"
              multiline
              rows={3}
              name="assetDescription"
              value={formData.assetDescription}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Tài liệu đính kèm
        </Typography>
        <DocumentUpload onFilesChange={handleAttachmentsChange} />

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Ghi chú
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              placeholder="Thêm ghi chú..."
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Tiếp tục
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
