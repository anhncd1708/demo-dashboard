import { Helmet } from "react-helmet-async";
import Other from "../view/Other/other";
import Priority from "../view/Priority/priority-view";
// ----------------------------------------------------------------------

export default function OtherPage() {
    return (
        <>
            <Helmet>
                <title> Quản lý độ ưu tiên </title>
            </Helmet>
            <Priority />
        </>
    );
}
