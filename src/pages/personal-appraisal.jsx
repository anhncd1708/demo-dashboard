import { Helmet } from "react-helmet-async";
import { PersonalAppraisalView } from "../view/PersonAppraisal";

// ----------------------------------------------------------------------

export default function PersonalAppraisalPage() {
  return (
    <>
      <Helmet>
        <title> DS Thẩm định cá nhân </title>
      </Helmet>
      <PersonalAppraisalView />
    </>
  );
}
