import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Box,
  Tab,
  Container,
  Divider,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getListBrief,
  getListBriefSuperDetail,
  getListFile,
  postBriefApproval,
} from "../../context/redux/action/action";
import Iconify from "../../components/Iconify/iconify";
import Scrollbar from "../../components/Scrollbar";
import { useParams } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BriefInfo from "./brief-info/brief-info";
import BriefDocument from "./brief-document/brief-document";
import BriefDocumentDRIVE from "./brief-document-drive/brief-document";
import Swal from "sweetalert2";

// ----------------------------------------------------------------------

export default function BriefDetailPage() {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const [value, setValue] = useState("1");

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const callAPI = async () => {
      await dispatch(getListBrief(`${id}`));
      await dispatch(getListBriefSuperDetail(`${id}`));
      await dispatch(getListFile());
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const briefs = useSelector((state) => {
    console.log(26, state.briefs);
    return state.briefs;
  });

  const briefDetail = useSelector((state) => {
    console.log(27, state.briefDetail);
    return state.briefDetail;
  });

  const files = useSelector((state) => {
    console.log(28, state.files);
    return state.files;
  });

  const handleApproved = (id) => {
    Swal.fire({
      title: "Xét duyệt hồ sơ",
      text: "Hãy đảm bảo rằng hồ sơ đã đủ yếu tố xét duyệt!",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: `Hủy`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await postBriefApproval(id)
          .then((resp) => {
            console.log(resp)
            if (resp.code === 1) {
              showSuccess();
            }
          })
          .catch((err) => {
            showError(err);
          });
      }
    });
  };

  function showSuccess() {
    Swal.fire({
      title: "Duyệt thành công!",
      text: "Hồ sơ đã được duyệt.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      window.location.reload();
    });
  }

  function showError(text) {
    Swal.fire({
      title: "Oops...",
      text: text,
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  let ref =
    "https://res.cloudinary.com/dj3zy8ivi/raw/upload/v1715847133/file/ktfhgfq6qzk8savvtkus.docx";

  return (
    <Container >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4">Chi tiết hồ sơ thẩm định</Typography>
        <Button
          sx={{ m: 5 }}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mdi:approve" />}
          onClick={() => handleApproved(id)}
        >
          Xét duyệt
        </Button>
      </Stack>

      <Card>
        <Scrollbar>
          <TabContext value={value}>
            <Box sx={{ px: 3, bgcolor: "background.neutral" }}>
              <TabList onChange={(e, value) => setValue(value)}>
                <Tab disableRipple value="1" label="Thông tin chi tiết" />
                <Tab
                  disableRipple
                  value="2"
                  label="Tài liệu"
                  sx={{ "& .MuiTab-wrapper": { whiteSpace: "nowrap" } }}
                />
                <Tab
                  disableRipple
                  value="3"
                  label="Tài liệu có thể chỉnh sửa"
                  sx={{ "& .MuiTab-wrapper": { whiteSpace: "nowrap" } }}
                />
              </TabList>
            </Box>

            <Divider />

            <TabPanel value="1">
              <Box sx={{ p: 3 }}>
                {loading ? (
                  <LinearProgress />
                ) : (
                  <BriefInfo detail={briefDetail} info={briefs} />
                )}
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <BriefDocument document={files} />
            </TabPanel>
            <TabPanel value="3">
              <BriefDocumentDRIVE document={files} />
            </TabPanel>
          </TabContext>
        </Scrollbar>
      </Card>
    </Container>
  );
}
