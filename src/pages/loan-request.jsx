import { Helmet } from "react-helmet-async";
import LoanRequestView from "../view/Loan-request/view-loan-request";

export default function LoanRequestPage() {
  return (
    <>
      <Helmet>
        <title> Yêu cầu vay </title>
      </Helmet>
      <LoanRequestView />
    </>
  );
}
