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
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as FileIcon,
  Visibility as ViewIcon,
  GetApp as DownloadIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import {
  fetchLoanRequest,
  approveLoanRequest,
} from "../../mock/fakeAPI/loanRequestAPI";
import { formatNumber } from "../../util/formatNumber";
// You'll need to create this

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
  const formattedValue =
    typeof value === "number" ? formatNumber(value) : value;
  return (
    <Typography>
      <Box
        component="span"
        sx={{ color: "#56585a", fontWeight: "bold", mr: 1 }}
      >
        {label}:
      </Box>
      {formattedValue}
    </Typography>
  );
}

function StatusStepper({ currentStatus }) {
  const steps = ["Đã nộp", "Đang xử lý", "Đã duyệt", "Đã giải ngân"];
  const currentStep = steps.indexOf(currentStatus);

  return (
    <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

function getFileIcon(fileType) {
  switch (fileType.toLowerCase()) {
    case "pdf":
      return <PdfIcon />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <ImageIcon />;
    case "doc":
    case "docx":
      return <DescriptionIcon />;
    default:
      return <FileIcon />;
  }
}

function AttachmentGallery({ attachments }) {
  return (
    <Box sx={{ width: "100%", maxHeight: 400, overflowY: "auto" }}>
      <List>
        {attachments.map((item, index) => {
          const fileExtension = item.url.split(".").pop();
          return (
            <ListItem
              key={index}
              secondaryAction={
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="view"
                    onClick={() => window.open(item.url, "_blank")}
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="download"
                    href={item.url}
                    download
                  >
                    <DownloadIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemIcon>{getFileIcon(fileExtension)}</ListItemIcon>
              <ListItemText
                primary={item.title}
                secondary={`Type: ${fileExtension.toUpperCase()}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default function ViewLoanRequestDetail() {
  const { id } = useParams();
  const [loanRequest, setLoanRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleApproveClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmApprove = async () => {
    try {
      await approveLoanRequest(id);
      // Refresh loan request data after approval
      const updatedLoanRequest = await fetchLoanRequest(id);
      setLoanRequest(updatedLoanRequest);
    } catch (err) {
      console.error("Error approving loan request:", err);
      setError("Failed to approve loan request. Please try again.");
    } finally {
      setOpenDialog(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!loanRequest) return <Typography>Loan request not found</Typography>;

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
              onClick={handleApproveClick}
            >
              Phê duyệt
            </Button>
          )}
      </Box>
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
              value={`${formatNumber(loanRequest.loanAmount)} VND`}
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
                  <TableCell>{formatNumber(item.estimatedValue)} VND</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Tài liệu đính kèm
        </Typography>
        <AttachmentGallery attachments={loanRequest.attachments} />
        {loanRequest.notes && (
          <Box>
            <Typography sx={{ color: "#56585a", fontWeight: "bold", mr: 1 }}>
              Ghi chú:
            </Typography>

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
              value={loanRequest.notes || ""}
              readOnly
              disabled
            />
          </Box>
        )}

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Trạng thái hồ sơ
        </Typography>
        <StatusStepper currentStatus={loanRequest.status} />
        {loanRequest.approvalDate && (
          <LabeledInfo
            label="Ngày phê duyệt"
            value={loanRequest.approvalDate}
          />
        )}
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận phê duyệt yêu cầu vay"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn phê duyệt yêu cầu vay này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleConfirmApprove} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
