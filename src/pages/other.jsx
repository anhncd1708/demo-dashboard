import { Helmet } from "react-helmet-async";
import Other from "../view/Other/other";
// ----------------------------------------------------------------------

export default function OtherPage() {
    return (
        <>
            <Helmet>
                <title> Errors </title>
            </Helmet>
            <Other />
        </>
    );
}
