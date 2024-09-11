import { Helmet } from "react-helmet-async";
import ViewCustomerDetail from "../view/Customers/customer-detail-view";

// ----------------------------------------------------------------------

export default function CustomerPage() {
  return (
    <>
      <Helmet>
        <title> Khách hàng </title>
      </Helmet>
      <ViewCustomerDetail />
    </>
  );
}
