import { lazy, Suspense, useState } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import Cookies from "js-cookie";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import OverviewPage from "../pages/overview";
import CustomerPage from "../pages/customer";
import BrokerPage from "../pages/brokers";
import AppraisalPlansPage from "../pages/appraisal-plans";
import ProfilePage from "../pages/profile";
import BriefDetailPage from "../pages/brief-detail";
import OtherPage from "../pages/other";
import BriefPage from "../pages/brief";

export const EmployeesPage = lazy(() => import("../pages/employees"));
export const LoginPage = lazy(() => import("../pages/login"));

// ----------------------------------------------------------------------

export default function Router() {
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
        { path: "briefs", element: <BriefPage /> },
        { path: "briefs/:id", element: <BriefDetailPage /> },
        { path: "other", element: <OtherPage /> },
        { path: "appraisal-plans", element: <AppraisalPlansPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "personal-appraisal", element: <CustomerPage /> },
        { path: "personal-appraisal/:id", element: <CustomerPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);

  return routes;
}
