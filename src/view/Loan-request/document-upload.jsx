import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DocumentUpload({ onFilesChange, initialFiles = [] }) {
  const [files, setFiles] = useState(initialFiles);

  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onFilesChange([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <Box>
      <input
        accept="image/*,application/pdf"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Tải lên tài liệu
        </Button>
      </label>

      {files.length > 0 && (
        <List>
          {files.map((file, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={file.name}
                secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      {files.length === 0 && (
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginTop: "1rem" }}
        >
          Chưa có tài liệu nào được tải lên
        </Typography>
      )}
    </Box>
  );
}
