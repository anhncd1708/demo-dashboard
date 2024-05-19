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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getListBrief,
  getListBriefSuperDetail,
  getListFile,
} from "../../context/redux/action/action";
import Iconify from "../../components/Iconify/iconify";
import Scrollbar from "../../components/Scrollbar";
import Loading from "../../components/Loading/Loading";
import TableNoData from "../../components/Table/table-no-data";
import UserTableRow from "../../components/Table/emp-table/emp-table-row";
import UserTableHead from "../../components/Table/table-head";
import TableEmptyRows from "../../components/Table/table-empty-rows";
import UserTableToolbar from "../../components/Table/table-toolbar";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../../components/Table/utils";
import TableLoading from "../../components/Table/table-loading";
import BriefTableRow from "../../components/Table/briefs-table/briefs-table-row";
import { useParams } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BriefInfo from "./brief-info/brief-info";
import BriefDocument from "./brief-document/brief-document";

// ----------------------------------------------------------------------

export default function BriefDetailPage() {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const [order, setOrder] = useState("asc");

  const [value, setValue] = useState("1");

  const [orderBy, setOrderBy] = useState("muc_dich_tham_dinh");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

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

  let ref =
    "https://res.cloudinary.com/dj3zy8ivi/raw/upload/v1715847133/file/ktfhgfq6qzk8savvtkus.docx";

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Chi tiết hồ sơ thẩm định</Typography>
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
              </TabList>
            </Box>

            <Divider />

            <TabPanel value="1">
              <Box sx={{ p: 3 }}>
                {loading ? (
                  <LinearProgress />
                ) : (
                  <BriefInfo detail={briefDetail} />
                )}
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <BriefDocument document={files} />
            </TabPanel>
          </TabContext>
        </Scrollbar>
      </Card>
    </Container>
  );
}
