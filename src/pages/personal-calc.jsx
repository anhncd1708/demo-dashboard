import { Helmet } from "react-helmet-async";
import { PersonalCalcView } from "../view/PersonalCalc";

// ----------------------------------------------------------------------

export default function PersonalCalcPage() {
  return (
    <>
      <Helmet>
        <title> Tính điểm hồ sơ </title>
      </Helmet>
      <PersonalCalcView />
    </>
  );
}
