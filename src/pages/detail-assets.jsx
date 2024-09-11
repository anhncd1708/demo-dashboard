import { Helmet } from "react-helmet-async";
import ViewAssetsDetail from "../view/Assets/assets-detail";
// ----------------------------------------------------------------------

export default function DetailAssetsPage() {
  return (
    <>
      <Helmet>
        <title>Tài sản</title>
      </Helmet>
      <ViewAssetsDetail />
    </>
  );
}
