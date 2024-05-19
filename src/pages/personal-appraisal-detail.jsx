import { Helmet } from "react-helmet-async";
import { PersonalAppraisalView } from "../view/PersonAppraisal";
import { PersonalDetailView } from "../view/Personal-appraisal-detail";

// ----------------------------------------------------------------------

export default function PersonalAppDetailPage() {
  return (
    <>
      <Helmet>
        <title> Thẩm định cá nhân </title>
      </Helmet>
      <PersonalDetailView />
    </>
  );
}
