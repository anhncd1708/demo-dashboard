import { Helmet } from "react-helmet-async";
import  OverView  from "../view/Loan-contract/loan-contract-view";

// ----------------------------------------------------------------------

export default function LoanContractPage() {
  return (
    <>
      <Helmet>
        <title>Hợp đồng cho vay</title>
      </Helmet>
      <OverView />
    </>
  );
}
