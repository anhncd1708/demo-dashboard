import React, { useState } from "react";
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
  Divider,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextareaAutosize,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the back arrow icon
import CreateLoanRequest from "./create-loan-request";
import CreateLoanOption from "./create-loan-option";
import LoanConfirmation from "./loan-confirmation";

const steps = ["Đề nghị vay vốn", "Phương án vay vốn", "Xác nhận"];

// Translation object
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

// Translation function
const translate = (key) => translations[key] || key;

// Add this function at the top of your file, after the imports
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

export default function LoanRequestProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [loanRequestData, setLoanRequestData] = useState({});
  const [loanOptionData, setLoanOptionData] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleLoanRequestComplete = (data) => {
    setLoanRequestData(data);
    handleNext();
  };

  const handleLoanOptionComplete = (data) => {
    setLoanOptionData(data);
    handleNext();
  };

  const handleConfirm = () => {
    // Here you would typically send the data to your backend
    console.log("Loan Request Data:", loanRequestData);
    console.log("Loan Option Data:", loanOptionData);
    // Proceed to the next step (e.g., success message or redirect)
    handleNext();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CreateLoanRequest
            onComplete={handleLoanRequestComplete}
            initialData={loanRequestData}
          />
        );
      case 1:
        return (
          <CreateLoanOption
            onComplete={handleLoanOptionComplete}
            initialData={loanOptionData}
          />
        );
      case 2:
        return (
          <LoanConfirmation
            loanRequestData={loanRequestData}
            loanOptionData={loanOptionData}
            onConfirm={handleConfirm}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        {activeStep !== 0 && (
          <Button
            color="inherit"
            onClick={handleBack}
            sx={{ ml: 3 }}
            startIcon={<ArrowBackIcon />} // Add the back arrow icon here
          >
            Quay lại
          </Button>
        )}
        <Box sx={{ flex: "1 1 auto" }} />
      </Box>

      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2, mb: 1 }}>{renderStepContent(activeStep)}</Box>
    </Box>
  );
}
