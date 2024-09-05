import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";

// ----------------------------------------------------------------------
import {
  getListAssetDetail,
  getListCustomerDetail,
} from "../../context/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Card, Box, Stack, Tab, Divider, LinearProgress } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";
import PersonalInfo from "./Personal-info/personal-info";
import BriefDocument from "../BriefDetail/brief-document/brief-document";

export default function OverView() {
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState("1");

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const callAPI = async () => {
      await dispatch(getListCustomerDetail(`${id}`));
      await dispatch(getListAssetDetail(`${id}`));
      setLoading(false);
    };
    callAPI();
  }, [dispatch]);

  const customers = useSelector((state) => {
    console.log(26, state.customerDetail);
    return state.customerDetail;
  });

  const assets = useSelector((state) => {
    console.log(27, state.assetsDetail);
    return state.assetsDetail;
  });

  return (
    <>
      <>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Chi tiết thẩm định cá nhân</Typography>
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
                  <PersonalInfo customer={customers} assets={assets} id={id} />
                </Box>
                {loading && <LinearProgress />}
              </TabPanel>
              <TabPanel value="2">
                <Box sx={{ p: 3 }}>
                  <BriefDocument />
                </Box>
              </TabPanel>
            </TabContext>
          </Scrollbar>
        </Card>
      </>
    </>
  );
}
