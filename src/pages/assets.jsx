import { Helmet } from "react-helmet-async";
import Other from "../view/Other/other";
import Assets from "../view/Assets/assets_view";
// ----------------------------------------------------------------------

export default function OtherPage() {
    return (
        <>
            <Helmet>
                <title> Danh sách tài sản </title>
            </Helmet>
            <Assets />
        </>
    );
}
