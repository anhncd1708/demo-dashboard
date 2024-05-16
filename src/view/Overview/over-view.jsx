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


  const canvasRef = useRef("https://res.cloudinary.com/dj3zy8ivi/image/upload/v1715699337/file/glqlehe0jztmklhjfphp.pdf");

  return (
    <>
      <Container maxWidth="xl">
        <h2>Overview</h2>
        <iframe src={"https://docs.google.com/gview?url=https://res.cloudinary.com/dj3zy8ivi/image/upload/v1715699337/file/glqlehe0jztmklhjfphp.pdf&embedded=true"} 
        style={{
          width: "100%",
          height: "1000px",
        }}></iframe>
      </Container>




    </>
  );
}
