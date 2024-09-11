import { Helmet } from "react-helmet-async";
import ViewLoanRequestDetail from "../view/Loan-request/detail-loan-request";
// ----------------------------------------------------------------------

export default function DetailLoanRequestPage() {
  return (
    <>
      <Helmet>
        <title>Đề nghị vay vốn</title>
      </Helmet>
      <ViewLoanRequestDetail />
    </>
  );
}
