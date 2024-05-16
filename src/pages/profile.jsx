import { Helmet } from "react-helmet-async";
import Profile from "../view/Profile/profile";

// ----------------------------------------------------------------------

export default function OverviewPage() {
    return (
        <>
            <Helmet>
                <title> Trang cá nhân </title>
            </Helmet>
            <Profile />
        </>
    );
}
