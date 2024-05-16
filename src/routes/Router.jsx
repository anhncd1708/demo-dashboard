import { lazy, Suspense, useState } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import Cookies from "js-cookie";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import OverviewPage from "../pages/overview";
import CustomerPage from "../pages/customer";
import BrokerPage from "../pages/brokers";
import AppraisalPlansPage from "../pages/appraisal-plans";
import ProfilePage from "../pages/profile";

export const EmployeesPage = lazy(() => import("../pages/employees"));
export const LoginPage = lazy(() => import("../pages/login"));

// ----------------------------------------------------------------------

export default function Router() {
  //   const ProtectedRouteAuthen = ({ roles, children }) => {
  //     const token = Cookies.get("token");
  //     const [user, setUser] = useState(null);
  //     let userTmp = Cookies.get("user");

  //     if (userTmp) {
  //       setUser(JSON.parse(userTmp));
  //       console.log(30, user);
  //     }

  //     try {
  //       if (!token || !user.role) {
  //         return <Navigate to="/login" replace />;
  //       } else if (roles.includes(user.role)) {
  //         console.log(31, user.role);
  //         return <>{children}</>;
  //       }
  //     } catch (error) {
  //       return <Navigate to="/login" replace />;
  //     }
  //   };

  const PrivateRoute = ({ children }) => {
    const user = Cookies.get("user");
    const token = Cookies.get("token");
    let auth;
    if (user && token) {
      auth = JSON.parse(user);
    }

    return auth ? <>{children}</> : <Navigate to="/login" />;
  };

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        { element: <OverviewPage />, index: true },
        { path: "employees", element: <EmployeesPage /> },
        { path: "customers", element: <CustomerPage /> },
        { path: "brokers", element: <BrokerPage /> },
        { path: "profile", element: <ProfilePage /> },
        {
          path: "appraisal-plans",
          element: <AppraisalPlansPage />,
          children: [
            {
              path: "appraisal-plans/test",
              element: <AppraisalPlansPage />,
            },
          ],
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);

  return routes;
}
