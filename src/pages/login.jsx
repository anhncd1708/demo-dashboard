import { Helmet } from "react-helmet-async";

import { LoginView } from "../view/Login";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <LoginView />
    </>
  );
}
