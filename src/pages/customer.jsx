import { Helmet } from "react-helmet-async";
import { CustomerView } from "../view/Customers";
import MockCustomerView from "../view/Customers/mock-customer-view";

// ----------------------------------------------------------------------

export default function CustomerPage() {
  return (
    <>
      <Helmet>
        <title> Khách hàng </title>
      </Helmet>
      {/* <CustomerView /> */}
      <MockCustomerView />
    </>
  );
}
