import { Helmet } from "react-helmet-async";
import { CustomerView } from "../view/Customers";

// ----------------------------------------------------------------------

export default function CustomerPage() {
  return (
    <>
      <Helmet>
        <title> Khách hàng </title>
      </Helmet>
      <CustomerView />
    </>
  );
}
