import { Helmet } from "react-helmet-async";
import { BriefView } from "../view/Briefs";
import { BriefDetailView } from "../view/BriefDetail";

// ----------------------------------------------------------------------

export default function BriefDetailPage() {
    return (
        <>
            <Helmet>
                <title> Hồ Sơ Thẩm Định </title>
            </Helmet>
            <BriefDetailView />
        </>
    );
}
