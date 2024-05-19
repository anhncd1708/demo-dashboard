import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Box,
  Tab,
  Container,
  Divider,
  styled,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListBriefSuperDetail } from "../../../context/redux/action/action";
import Label from "../../../components/Label/label";
import Scrollbar from "../../../components/Scrollbar";
import moment from "moment";
import DocumentItems from "./doc-items";
// ----------------------------------------------------------------------

export default function BriefDocument({ document }) {
  return (
    <>
      {/* <Scrollbar>
        <Box sx={{ minWidth: { md: 800 } }}>
          {document.map((doc) => (
            <DocumentItems
              key={doc.id}
              date_create={doc.date_create}
              file_name={doc.file_name}
              file_type={doc.file_type}
              file_url={doc.file_url}
            />
          ))}
        </Box>
      </Scrollbar> */}
      Document
      <iframe
        src={
          "https://view.officeapps.live.com/op/embed.aspx?src=https://res.cloudinary.com/dj3zy8ivi/raw/upload/v1715847133/file/ktfhgfq6qzk8savvtkus.docx"
        }
        style={{
          border: "none",
          width: "100%",
          height: "1000px",
        }}
      ></iframe>
      {/* <iframe src="https://res-console.cloudinary.com/dj3zy8ivi/media_explorer_thumbnails/cabc568a47041b5aeab1e6a8e98f135a/detailed"
                style={{
                  width: "80%",
                  height: "700px",
                }}></iframe> */}
    </>
  );
}
