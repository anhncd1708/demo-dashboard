import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  BrokenImage as BrokenImageIcon,
} from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Assume you have a function to fetch customer data
import { fetchCustomer } from "../../mock/fakeAPI/customerAPI";

function LabeledInfo({ label, value }) {
  return (
    <Box mb={2}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}

function ImageDisplay({ title, imageUrl }) {
  const handleViewFullImage = () => {
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>
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
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
              onClick={handleViewFullImage}
            >
              <VisibilityIcon />
            </IconButton>
          </>
        ) : (
          <>
            <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main" }} />
            <Typography>No image available</Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default function ViewCustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const loadCustomer = async () => {
      const data = await fetchCustomer(id);
      setCustomer(data);
    };
    loadCustomer();
  }, [id]);

  const handleUpdate = () => {
    // Navigate to the update page. You'll need to create this route and component.
    navigate(`/customers/edit/${id}`);
  };

  if (!customer) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1000, margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Chi tiết khách hàng
        </Typography>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Cập nhật
        </Button>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin cá nhân
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Tên khách hàng" value={customer.name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo
              label="Số thẻ thành viên"
              value={customer.membershipNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Giới tính" value={customer.gender} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo
              label="Địa chỉ liên lạc"
              value={customer.contactAddress}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo
              label="Địa chỉ cư trú"
              value={customer.residentialAddress}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo
              label="Địa bàn cư trú"
              value={customer.residentialArea}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Điện thoại" value={customer.phone} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Email" value={customer.email} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Ghi chú
        </Typography>
        <Typography variant="body1">{customer.notes}</Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          CMND/CCCD/GPKD
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ImageDisplay title="Mặt trước" imageUrl={customer.frontIdImage} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ImageDisplay title="Mặt sau" imageUrl={customer.backIdImage} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Thông tin giấy tờ
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Số giấy tờ" value={customer.idNumber} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Loại giấy tờ" value={customer.idType} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Nơi cấp" value={customer.idIssuedPlace} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Ngày cấp" value={customer.idIssuedDate} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabeledInfo label="Ngày hết hạn" value={customer.idExpiryDate} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Chữ ký
        </Typography>
        <ImageDisplay
          title="Chữ ký khách hàng"
          imageUrl={customer.signatureImage}
        />
      </Paper>
    </Box>
  );
}
