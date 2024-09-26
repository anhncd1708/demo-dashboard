import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DocumentUpload from "./document-upload";
import CustomerSelectionModal from "./customer-selection-modal";

export default function CreateLoanRequest({ onComplete, initialData }) {
  const [formData, setFormData] = useState({
    customerName: initialData?.customerName || "",
    membershipNumber: initialData?.membershipNumber || "",
    phoneNumber: initialData?.phoneNumber || "",
    email: initialData?.email || "",
    requestedLoanAmount: initialData?.requestedLoanAmount || "",
    loanTerm: initialData?.loanTerm || "",
    loanPurpose: initialData?.loanPurpose || "",
    assetType: initialData?.assetType || "",
    assetValue: initialData?.assetValue || "",
    monthlyIncome: initialData?.monthlyIncome || "",
    expenses: initialData?.expenses || "",
    accumulatedIncome: initialData?.accumulatedIncome || "",
    borrowerType: initialData?.borrowerType || "",
    assetDescription: initialData?.assetDescription || "", // Add this line
    notes: initialData?.notes || "", // Add this line
    // Add any other fields you have in your form
  });

  const [attachments, setAttachments] = useState(
    initialData?.attachments || []
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    const requiredFields = [
      "customerName",
      "membershipNumber",
      "phoneNumber",
      "loanAmount",
      "loanTerm",
      "loanPurpose",
      "assetType",
      "assetValue",
      "assetDescription",
    ];

    const allFieldsFilled = requiredFields.every(
      (field) => formData[field] !== ""
    );
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

  const handleCustomerSelect = (customer) => {
    setFormData((prevData) => ({
      ...prevData,
      customerName: customer.name,
      membershipNumber: customer.membershipNumber,
      phoneNumber: customer.phone,
      email: customer.email,
    }));
    setIsCustomerModalOpen(false);
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
    <Box sx={{ p: 3, maxWidth: 1500, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Đề nghị vay vốn
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
              onClick={() => setIsCustomerModalOpen(true)}
              InputProps={{
                readOnly: true,
              }}
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
              InputProps={{
                readOnly: true,
                disabled: true,
              }}
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
              InputProps={{
                readOnly: true,
                disabled: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                disabled: true,
              }}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Thông tin khoản vay
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
            <FormControl fullWidth required>
              <InputLabel id="borrower-type-label">
                Đối tượng vay vốn
              </InputLabel>
              <Select
                labelId="borrower-type-label"
                id="borrower-type"
                name="borrowerType"
                value={formData.borrowerType}
                onChange={handleChange}
                label="Đối tượng vay vốn"
              >
                <MenuItem value="individual">Cá nhân</MenuItem>
                <MenuItem value="entity">Pháp nhân</MenuItem>
              </Select>
            </FormControl>
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
        <DocumentUpload
          onFilesChange={handleAttachmentsChange}
          initialFiles={attachments}
        />

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

        <CustomerSelectionModal
          open={isCustomerModalOpen}
          onClose={() => setIsCustomerModalOpen(false)}
          onSelect={handleCustomerSelect}
        />

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
