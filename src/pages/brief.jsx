import { Helmet } from "react-helmet-async";
import { BriefView } from "../view/Briefs";

// ----------------------------------------------------------------------

export default function BriefPage() {
    return (
        <>
            <Helmet>
                <title> DS hồ sơ thẩm định </title>
            </Helmet>
            <BriefView />
        </>
    );
}
