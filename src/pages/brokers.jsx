import { Helmet } from "react-helmet-async";
import { BrokerView } from "../view/Brokers";

// ----------------------------------------------------------------------

export default function BrokerPage() {
  return (
    <>
      <Helmet>
        <title> Người môi giới </title>
      </Helmet>
      <BrokerView />
    </>
  );
}
