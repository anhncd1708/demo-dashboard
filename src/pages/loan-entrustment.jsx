import { Helmet } from "react-helmet-async";
import  OverView  from "../view/Loan-entrustment/loan-entrustment-view";

// ----------------------------------------------------------------------

export default function LoanEntrustmentPage() {
  return (
    <>
      <Helmet>
        <title>Ủy thác cho vay</title>
      </Helmet>
      <OverView />
    </>
  );
}
