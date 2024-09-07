import { Helmet } from "react-helmet-async";
import CreateCustomer from "../view/Customers/create-customer";

// ----------------------------------------------------------------------

export default function CreateCustomerPage() {
  return (
    <>
      <Helmet>
        <title> Tạo khách hàng </title>
      </Helmet>
      <CreateCustomer />
    </>
  );
}
