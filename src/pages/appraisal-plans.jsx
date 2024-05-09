import { Helmet } from "react-helmet-async";
import { AppraisalPlanView } from "../view/Appraisal-plans";

// ----------------------------------------------------------------------

export default function AppraisalPlansPage() {
  return (
    <>
      <Helmet>
        <title> DS kế hoạch thẩm định </title>
      </Helmet>
      <AppraisalPlanView />
    </>
  );
}
