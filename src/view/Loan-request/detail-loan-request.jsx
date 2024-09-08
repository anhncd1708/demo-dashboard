import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchLoanRequest } from "../../mock/fakeAPI/loanRequestAPI"; // You'll need to create this

function ImageDisplay({ title, imageUrl }) {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <img
        src={imageUrl}
        alt={title}
        style={{ maxWidth: "100%", maxHeight: "80%", objectFit: "contain" }}
      />
    </Box>
  );
}

function LabeledInfo({ label, value }) {
  return (
    <Typography>
      <Box
        component="span"
        sx={{ color: "#1c252e", fontWeight: "bold", mr: 1 }}
      >
        {label}:
      </Box>
      {value}
    </Typography>
  );
}

export default function ViewLoanRequest() {
  const { id } = useParams();
  const [loanRequest, setLoanRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLoanRequest = async () => {
      try {
        setLoading(true);
        console.log("Attempting to fetch loan request with ID:", id);
        const data = await fetchLoanRequest(id);
        console.log("Fetched loan request data:", data);
        setLoanRequest(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching loan request:", err);
        setError("Failed to load loan request data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadLoanRequest();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!loanRequest) return <Typography>Loan request not found</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 1000, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Thông tin yêu cầu vay
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin khách hàng
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <LabeledInfo
              label="Tên khách hàng"
              value={loanRequest.customerName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo
              label="Số thẻ thành viên"
              value={loanRequest.membershipNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Số điện thoại" value={loanRequest.phone} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Email" value={loanRequest.email} />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Thông tin khoản vay
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <LabeledInfo
              label="Số tiền vay"
              value={`${loanRequest.loanAmount} VND`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo
              label="Thời hạn vay"
              value={`${loanRequest.loanTerm} tháng`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo
              label="Lãi suất"
              value={`${loanRequest.interestRate}%`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Mục đích vay" value={loanRequest.loanPurpose} />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Tài sản thế chấp
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Loại tài sản</TableCell>
                <TableCell>Giá trị ước tính</TableCell>
                <TableCell>Mô tả</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loanRequest.collateral.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.estimatedValue} VND</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Tài liệu đính kèm
        </Typography>
        <Grid container spacing={3}>
          {loanRequest.attachments.map((attachment, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <ImageDisplay
                title={attachment.title}
                imageUrl={attachment.url}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Trạng thái yêu cầu
        </Typography>
        <LabeledInfo label="Trạng thái" value={loanRequest.status} />
        {loanRequest.approvalDate && (
          <LabeledInfo
            label="Ngày phê duyệt"
            value={loanRequest.approvalDate}
          />
        )}
        {loanRequest.notes && (
          <LabeledInfo label="Ghi chú" value={loanRequest.notes} />
        )}
      </Paper>
    </Box>
  );
}
