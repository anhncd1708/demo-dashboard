import React, { useState } from "react";
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Button, Stepper, Step, StepLabel } from "@mui/material";
import CreateLoanRequest from "./create-loan-request";
import CreateLoanOption from "./create-loan-option";

const steps = ["Thông tin yêu cầu vay", "Tùy chọn khoản vay", "Xác nhận"];

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
};

// Translation function
const translate = (key) => translations[key] || key;

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
                return <CreateLoanRequest onComplete={handleLoanRequestComplete} />;
            case 1:
                return <CreateLoanOption onComplete={handleLoanOptionComplete} />;
            case 2:
                return (
                    <Box sx={{ p: 3, maxWidth: 1500, margin: "auto" }}>
                        <Typography variant="h5" gutterBottom>
                            Xác nhận thông tin
                        </Typography>
                        <Paper sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" gutterBottom>Thông tin khách hàng</Typography>
                                    <Typography>{loanRequestData.customerName}</Typography>
                                    <Typography>{loanRequestData.phoneNumber}</Typography>
                                    <Typography>{loanRequestData.email}</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6">LRQ-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000)}</Typography>
                                    <Typography>Ngày tạo: {new Date().toLocaleDateString()}</Typography>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="h6" gutterBottom>Thông tin khoản vay</Typography>

                            <Grid container spacing={2}>
                                {Object.entries({ ...loanRequestData, ...loanOptionData }).map(([key, value]) => {
                                    if (key !== 'customerName' && key !== 'phoneNumber' && key !== 'email' && key !== 'attachments') {
                                        return (
                                            <Grid item xs={6} key={key}>
                                                <Box display="flex" >
                                                    <div className="flex">
                                                        <Typography variant="subtitle2" sx={{ minWidth: '300px' }}>
                                                            {translate(key)}:
                                                        </Typography>
                                                    </div>
                                                    <div className="flex">
                                                        <Typography variant="body1" sx={{ textAlign: 'right' }}>{value}</Typography>
                                                    </div>
                                                </Box>
                                            </Grid>
                                        );
                                    }
                                    return null;
                                })}
                            </Grid>

                            {loanRequestData.attachments && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="h6" gutterBottom>Tài liệu đính kèm</Typography>
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
                                                        <TableCell align="right">{(file.size / 1024 / 1024).toFixed(2)} MB</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            )}

                            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                                <Button variant="contained" color="primary" onClick={handleConfirm}>
                                    Xác nhận và gửi
                                </Button>
                            </Box>
                        </Paper>
                    </Box >
                );
            default:
                return <div>Unknown step</div>;
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ mt: 2, mb: 1 }}>{renderStepContent(activeStep)}</Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Quay lại
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep === steps.length - 1 ? null : (
                    <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
                        Tiếp theo
                    </Button>
                )}
            </Box>
        </Box>
    );
}