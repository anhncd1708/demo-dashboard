import React, { useState } from "react";
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

const paymentOptions = [
    "Hàng ngày",
    "Hàng tháng",
    "Hàng quý",
    "Hàng năm",
    "06 tháng",
    "Cuối kỳ",
];

export default function CreateLoanOption({ onComplete }) {
    const [formData, setFormData] = useState({
        familyIncome: "",
        totalCapitalNeeded: "",
        ownCapital: "",
        requestedLoanAmount: "",
        loanRepayment: "",
        monthlyIncome: "",
        expenses: "",
        accumulatedIncome: "",
        principalPayment: "",
        interestPayment: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onComplete(formData);
    };

    return (
        <Box sx={{ p: 3, maxWidth: 1000, margin: "auto" }}>
            <Typography variant="h5" gutterBottom>
                Tùy chọn khoản vay
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Thu nhập gia đình"
                            variant="outlined"
                            type="number"
                            name="familyIncome"
                            value={formData.familyIncome}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Nguồn vốn
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Tổng nhu cầu vốn cần thiết"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Vốn tự có"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Vốn đề nghị xin vay"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Trả nợ vay
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Thu nhập hàng tháng"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Chi phí"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Thu nhập tích luỹ"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Kế hoạch trả nợ vay
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Gốc</InputLabel>
                            <Select
                                value={formData.principalPayment}
                                onChange={handleChange}
                                label="Gốc"
                                name="principalPayment"
                            >
                                {paymentOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Lãi</InputLabel>
                            <Select
                                value={formData.interestPayment}
                                onChange={handleChange}
                                label="Lãi"
                                name="interestPayment"
                            >
                                {paymentOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Tiếp tục
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}