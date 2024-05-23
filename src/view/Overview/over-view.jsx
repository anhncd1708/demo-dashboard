import { Container, Grid } from "@mui/material";
import Cookies from "js-cookie";
import { AppTotalActiveUsers, AppWelcome, AppTotalBrief, AppTotalPlan, AppCurrentAsset, AppAreaApproved } from "../../components/GeneralApp";
// ----------------------------------------------------------------------

export default function OverView() {
  const user = JSON.parse(Cookies.get("user"))

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={user.username} />
          </Grid>

          <Grid item xs={12} md={4}>
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalActiveUsers />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalBrief />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalPlan />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentAsset />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaApproved />
          </Grid>
          {/*
          <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AppWidgets1 />
              </Grid>
              <Grid item xs={12}>
                <AppWidgets2 />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
