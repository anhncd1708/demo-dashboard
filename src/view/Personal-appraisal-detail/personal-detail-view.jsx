import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";

// ----------------------------------------------------------------------
import { getListEmployee } from "../../context/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Card, Box, Stack, Tab, Divider } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export default function OverView() {
  const [value, setValue] = useState("1");
  const dispatch = useDispatch();
  // const listEmployees = useSelector((state) => state.listEmployee);

  // Get data employees when component mounting
  // useEffect(() => {
  //   const callAPI = async () => {};
  //   callAPI();
  // }, [dispatch]);

  return (
    <>
      <Container>
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
                  <h2>test</h2>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box sx={{ p: 3 }}>
                  <h2>test</h2>
                </Box>
              </TabPanel>
            </TabContext>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
