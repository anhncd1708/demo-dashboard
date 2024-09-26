import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const formatCurrency = (value) => {
  if (value == null || value === "") return "";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("₫", "VNĐ");
};

const translate = (key) => {
  const translations = {
    customerName: "Tên khách hàng",
    membershipNumber: "Số thẻ thành viên",
    phoneNumber: "Số điện thoại",
    email: "Email",
    loanAmount: "Số tiền vay",
    loanTerm: "Thời hạn vay (Tháng)",
    loanPurpose: "Mục đích vay",
    assetType: "Loại tài sản",
    assetValue: "Giá trị tài sản",
    assetDescription: "Mô tả tài sản",
    notes: "Ghi chú",
    attachments: "Tài liệu đính kèm",
    familyIncome: "Thu nhập gia đình",
    totalCapitalNeeded: "Tổng nhu cầu vốn cần thiết",
    ownCapital: "Vốn tự có",
    requestedLoanAmount: "Vốn đề nghị xin vay",
    loanRepayment: "Trả nợ vay",
    monthlyIncome: "Thu nhập hàng tháng",
    expenses: "Chi phí",
    accumulatedIncome: "Thu nhập tích luỹ",
    principalPayment: "Kế hoạch trả nợ gốc",
    interestPayment: "Kế hoạch trả lãi",
    borrowerType: "Đối tượng vay vốn",
  };
  return translations[key] || key;
};

const LoanConfirmation = ({ loanRequestData, loanOptionData, onConfirm }) => {
  return (
    <Box sx={{ p: 3, maxWidth: 1500, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        XÁC NHẬN THÔNG TIN
      </Typography>
      <Paper sx={{ p: 3, borderRadius: "10px" }}>
        {/* Customer Information */}
        <Box sx={{ borderBottom: `dashed 1px #e1e1e1`, pb: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin khách hàng
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              {/* <Typography variant="h6">
                      LRQ-{new Date().getFullYear()}-
                      {Math.floor(Math.random() * 10000)}
                    </Typography> */}
              <Typography variant="caption">
                Ngày tạo: {new Date().toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box display="flex" sx={{ px: 5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#464646", width: "100%" }}
                >
                  Tên khách hàng:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "right", width: "100%" }}
                >
                  {loanRequestData.customerName}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box display="flex" sx={{ px: 5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#464646", width: "100%" }}
                >
                  Số thẻ thành viên:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "right", width: "100%" }}
                >
                  {loanRequestData.membershipNumber}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" sx={{ px: 5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#464646", width: "100%" }}
                >
                  Số điện thoại:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "right", width: "100%" }}
                >
                  {loanRequestData.phoneNumber}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" sx={{ px: 5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#464646", width: "100%" }}
                >
                  Email:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "right", width: "100%" }}
                >
                  {loanRequestData.email}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Loan Information */}
        <Box sx={{ borderBottom: `dashed 1px #e1e1e1`, pb: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thông tin khoản vay
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Box display="flex" sx={{ px: 5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#464646", width: "100%" }}
                >
                  Số tiền vay:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "right", width: "100%" }}
                >
                  {formatCurrency(loanRequestData.loanAmount)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" sx={{ px: 5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#464646", width: "100%" }}
                >
                  Đối tượng vay vốn:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "right", width: "100%" }}
                >
                  {loanRequestData.borrowerType === "individual"
                    ? "Cá nhân"
                    : "Pháp nhân"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" sx={{ px: 5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#464646", width: "100%" }}
                >
                  Thời hạn vay:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "right", width: "100%" }}
                >
                  {formatCurrency(loanRequestData.loanTerm)} Tháng
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                sx={{ color: "#464646", px: 5 }}
                variant="subtitle2"
                gutterBottom
              >
                Mục đích vay:
              </Typography>
              <Box display="flex" sx={{ px: 5 }}>
                <textarea
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    resize: "none",
                    minHeight: "50px",
                    backgroundColor: "#f5f5f5",
                    color: "#666",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  value={loanRequestData.loanPurpose || ""}
                  readOnly
                  disabled
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Tài sản thế chấp
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Box display="flex" sx={{ px: 5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#464646", width: "100%" }}
                >
                  Loại tài sản:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "right", width: "100%" }}
                >
                  {loanRequestData.assetType}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" sx={{ px: 5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#464646", width: "100%" }}
                >
                  Giá trị ước tính:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "right", width: "100%" }}
                >
                  {formatCurrency(loanRequestData.assetValue)}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                sx={{ color: "#464646", px: 5 }}
                variant="subtitle2"
                gutterBottom
              >
                Mô tả tài sản:
              </Typography>
              <Box display="flex" sx={{ px: 5 }}>
                <textarea
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    resize: "none",
                    minHeight: "50px",
                    backgroundColor: "#f5f5f5",
                    color: "#666",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  value={loanRequestData.assetDescription || ""}
                  readOnly
                  disabled
                />
              </Box>
            </Grid>

            {Object.entries({
              ...loanOptionData,
            }).map(([key, value]) => {
              if (
                key !== "customerName" &&
                key !== "phoneNumber" &&
                key !== "email" &&
                key !== "membershipNumber" &&
                key !== "attachments" &&
                key !== "notes" &&
                key !== "loanAmount" &&
                key !== "loanTerm" &&
                key !== "loanPurpose"
              ) {
                // Check if the value should be formatted as currency
                const shouldFormatAsCurrency = [
                  "loanAmount",
                  "familyIncome",
                  "totalCapitalNeeded",
                  "ownCapital",
                  "requestedLoanAmount",
                  "monthlyIncome",
                  "expenses",
                  "accumulatedIncome",
                  "assetValue",
                ].includes(key);

                return (
                  <Grid item xs={6} key={key}>
                    <Box display="flex" sx={{ px: 5 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#464646", width: "100%" }}
                      >
                        {translate(key)}:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ textAlign: "right", width: "100%" }}
                      >
                        {shouldFormatAsCurrency ? formatCurrency(value) : value}
                      </Typography>
                    </Box>
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>
        </Box>

        {/* Notes */}
        <Typography variant="h6" gutterBottom>
          Ghi chú
        </Typography>
        <Box sx={{ p: 3 }}>
          <textarea
            rows={3}
            placeholder="Không có ghi chú"
            style={{
              width: "100%",
              padding: "10px",
              resize: "none",
              backgroundColor: "#f5f5f5",
              color: "#666",
              borderRadius: "10px",
            }}
            value={loanRequestData.notes || ""}
            readOnly
            disabled
          />
        </Box>

        {/* Attachments */}
        {loanRequestData.attachments && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tài liệu đính kèm
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên tài liệu</TableCell>
                    <TableCell align="right">Kích thước</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loanRequestData.attachments.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell>{file.name}</TableCell>
                      <TableCell align="right">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Xác nhận và gửi
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoanConfirmation;
