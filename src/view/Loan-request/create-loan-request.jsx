import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as FileIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

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

function DocumentUpload({ onFilesChange }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (onFilesChange) {
      onFilesChange([...files, ...newFiles]);
    }
  };

  const handleDelete = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (onFilesChange) {
      onFilesChange(newFiles);
    }
  };

  return (
    <Box>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="document-upload"
      />
      <label htmlFor="document-upload">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Tải lên tài liệu
        </Button>
      </label>
      <List>
        {files.map((file, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(index)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              {getFileIcon(file.name.split(".").pop())}
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default function CreateLoanRequest() {
  const [attachments, setAttachments] = useState([]);

  const handleAttachmentsChange = (files) => {
    setAttachments(files);
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
            <TextField fullWidth label="Tên khách hàng" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Số thẻ thành viên" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Số điện thoại" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" variant="outlined" />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Thông tin khoản vay
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Số tiền vay (VND)"
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Thời hạn vay (tháng)"
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mục đích vay"
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Tài sản thế chấp
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Loại tài sản" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Giá trị ước tính (VND)"
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mô tả tài sản"
              variant="outlined"
              multiline
              rows={3}
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
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary">
            Tạo yêu cầu vay
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
