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
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { mockLoanRequests, mockEmployees } from "../../mock/mock-data";
import { formatNumber } from "../../util/formatNumber";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignAppraiserModal from "./assign-appraiser-modal";

export default function ViewLoanRequestDetail() {
  const { id } = useParams();
  const [loanRequest, setLoanRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const loadLoanRequest = async () => {
      try {
        setLoading(true);
        const data = mockLoanRequests.find((request) => request.id === id);
        if (data) {
          setLoanRequest(data);
          setError(null);
        } else {
          setError("Loan request not found");
        }
      } catch (err) {
        console.error("Error fetching loan request:", err);
        setError("Failed to load loan request data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadLoanRequest();
  }, [id]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAssignEmployees = (selectedEmployees) => {
    console.log("Assigned employees:", selectedEmployees);
    // Here you would update the loan request with the assigned employees
    handleCloseModal();
  };

  const handleViewFile = (url) => {
    window.open(url, "_blank");
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!loanRequest) return <Typography>Loan request not found</Typography>;

  const appraisers = mockEmployees.filter(
    (employee) => employee.position_name === "Cấp nhân viên tín dụng"
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1500 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Thông tin yêu cầu vay
        </Typography>
        {loanRequest.status !== "Đã phê duyệt" &&
          loanRequest.status !== "Đã giải ngân" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
            >
              Chỉ định thẩm định viên
            </Button>
          )}
      </Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin khách hàng
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Tên khách hàng:
            </Typography>
            <Typography variant="body1">{loanRequest.customerName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Số thẻ thành viên:
            </Typography>
            <Typography variant="body1">
              {loanRequest.membershipNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Số điện thoại:
            </Typography>
            <Typography variant="body1">{loanRequest.phoneNumber}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Email:
            </Typography>
            <Typography variant="body1">{loanRequest.email}</Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Thông tin khoản vay
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Số tiền vay:
            </Typography>
            <Typography variant="body1">
              {formatNumber(loanRequest.loanAmount)} VND
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Thời hạn vay:
            </Typography>
            <Typography variant="body1">
              {loanRequest.loanTerm} tháng
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Mục đích vay:
            </Typography>
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
              value={loanRequest.loanPurpose || ""}
              readOnly
              disabled
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Lãi suất:
            </Typography>
            <Typography variant="body1">{loanRequest.interestRate}%</Typography>
          </Grid> */}
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Tài sản thế chấp
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Loại tài sản:
            </Typography>
            <Typography variant="body1">{loanRequest.assetType}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Giá trị tài sản:
            </Typography>
            <Typography variant="body1">
              {formatNumber(loanRequest.assetValue)} VND
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle2" sx={{ color: "#464646" }}>
              Mô tả tài sản:
            </Typography>
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
              value={loanRequest.assetDescription || ""}
              readOnly
              disabled
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Tài liệu đính kèm
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên tài liệu</TableCell>
                <TableCell align="right">Kích thước</TableCell>
                <TableCell align="center">Xem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loanRequest.attachments.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>{file.title}</TableCell>
                  <TableCell align="right">
                    {file.size
                      ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                      : "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Xem tài liệu">
                      <IconButton onClick={() => handleViewFile(file.url)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
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
            value={loanRequest.notes || ""}
            readOnly
            disabled
          />
        </Box>
      </Paper>

      <AssignAppraiserModal
        open={openModal}
        handleClose={handleCloseModal}
        onAssign={handleAssignEmployees}
      />
    </Box>
  );
}
