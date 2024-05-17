import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Box,
  Tab,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getListBrief,
  getListEmployee,
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
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const briefs = useSelector((state) => {
    console.log(26, state.briefs);
    return state.briefs;
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
                <BriefInfo />
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <iframe
                src={
                  "https://view.officeapps.live.com/op/embed.aspx?src=" + ref
                }
                style={{
                  border: "0",
                  width: "100%",
                  height: "1000px",
                }}
              ></iframe>

              {/* <iframe src="https://res-console.cloudinary.com/dj3zy8ivi/media_explorer_thumbnails/cabc568a47041b5aeab1e6a8e98f135a/detailed"
                style={{
                  width: "80%",
                  height: "700px",
                }}></iframe> */}
            </TabPanel>
          </TabContext>
        </Scrollbar>
      </Card>
    </Container>
  );
}
