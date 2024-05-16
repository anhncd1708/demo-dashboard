import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------
import {
  getListEmployee,
  getListAppraisalDocumentDetail,
  getListAppraisalPlan,
  getListAppraisalPlanDetail,
  getListAppraisalPlanType,
  getListAsset,
  getListAssetType,
  getListBrief,
  getListBriefPoint,
  getListBroker,
  getListCustomer,
  getListCustomerType,
  getListEmployeePositions,
  getListVocative,
  getListPriorityLevel
} from "../../context/redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

export default function OverView() {
  const dispatch = useDispatch();
  // const listEmployees = useSelector((state) => state.listEmployee);

  // Get data employees when component mounting
  useEffect(() => {
    const callAPI = async () => {
      // await dispatch(getListEmployee("NV000"));
      // await dispatch(getListAppraisalDocumentDetail());
      // await dispatch(getListAppraisalPlan());
      // await dispatch(getListAppraisalPlanDetail());
      // await dispatch(getListAppraisalPlanType());
      // await dispatch(getListAsset());
      // await dispatch(getListAssetType());
      // await dispatch(getListBrief());
      // await dispatch(getListBriefPoint());
      // await dispatch(getListBroker());
      // await dispatch(getListCustomer());
      // await dispatch(getListCustomerType());
      // await dispatch(getListEmployeePositions());
      // await dispatch(getListVocative());
      // await dispatch(getListPriorityLevel());
    }
    callAPI();
  }, [dispatch]);


  let ref = "https://res.cloudinary.com/dj3zy8ivi/raw/upload/v1715847133/file/ktfhgfq6qzk8savvtkus.docx";

  return (
    <>
      <Container maxWidth="xl">
        <h2>Overview</h2>
        <iframe src={'https://view.officeapps.live.com/op/embed.aspx?src=' + ref}
          style={{
            width: "80%",
            height: "700px",
          }}></iframe>

        <iframe src="https://res-console.cloudinary.com/dj3zy8ivi/media_explorer_thumbnails/cabc568a47041b5aeab1e6a8e98f135a/detailed"
          style={{
            width: "80%",
            height: "700px",
          }}></iframe>
             <iframe src="https://docs.google.com/document/d/12CS54auOhnxSwuZ8tWaI_MZLyR6sSEWI0POAOpFlnlc/edit?usp=sharing"
          style={{
            width: "80%",
            height: "700px",
          }}></iframe>
      </Container>


    </>
  );
}
