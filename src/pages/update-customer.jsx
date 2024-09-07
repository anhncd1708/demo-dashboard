import { Helmet } from "react-helmet-async";
import UpdateCustomer from "../view/Customers/update-customer";

// ----------------------------------------------------------------------

export default function UpdateCustomerPage() {
  return (
    <>
      <Helmet>
        <title> Cập nhật khách hàng </title>
      </Helmet>
      <UpdateCustomer />
    </>
  );
}
