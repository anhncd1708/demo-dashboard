import { Helmet } from "react-helmet-async";
import OverView from "../view/Trust-contract/trust-contract-view";

// ----------------------------------------------------------------------

export default function TrustContractPage() {
  return (
    <>
      <Helmet>
        <title>Hợp đồng ủy thác</title>
      </Helmet>
      <OverView />
    </>
  );
}
