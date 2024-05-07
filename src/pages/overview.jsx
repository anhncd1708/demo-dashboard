import { Helmet } from "react-helmet-async";
import OverView from "../view/Overview/over-view";

// ----------------------------------------------------------------------

export default function OverviewPage() {
  return (
    <>
      <Helmet>
        <title> Thống kê </title>
      </Helmet>
      <OverView />
    </>
  );
}
