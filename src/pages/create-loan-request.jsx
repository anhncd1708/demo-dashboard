import { Helmet } from "react-helmet-async";
import CreateLoanRequest from "../view/Loan-request/create-loan-request";

export default function CreateLoanRequestPage() {
  return (
    <>
      <Helmet>
        <title> Tạo yêu cầu vay </title>
      </Helmet>
      <CreateLoanRequest />
    </>
  );
}
