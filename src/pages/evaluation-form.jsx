import { Helmet } from "react-helmet-async";
import Other from "../view/Other/other";
import Evaluation from "../view/Evaluation-form/evaluation-form-view";
// ----------------------------------------------------------------------

export default function OtherPage() {
    return (
        <>
            <Helmet>
                <title> Mẫu tiêu chí đánh giá </title>
            </Helmet>
            <Evaluation />
        </>
    );
}
