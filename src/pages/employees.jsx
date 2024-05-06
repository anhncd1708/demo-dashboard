import { Helmet } from "react-helmet-async";
import { EmpView } from "../view/Employees";

// ----------------------------------------------------------------------

export default function EmpPage() {
  return (
    <>
      <Helmet>
        <title> Employees </title>
      </Helmet>
      <EmpView />
    </>
  );
}
