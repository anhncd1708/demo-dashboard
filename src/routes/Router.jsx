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
import PersonalAppraisalPage from "../pages/personal-appraisal";
import PersonalAppDetailPage from "../pages/personal-appraisal-detail";

import AssetsPage from "../pages/assets";
import EvaluationPage from "../pages/evaluation-form";
import PriorityPage from "../pages/priority";
import PersonalCalcPage from "../pages/personal-calc";
import LoanEntrustmentPage from "../pages/loan-entrustment";
import LoanContractPage from "../pages/loan-contract";
import TrustContractPage from "../pages/trust-contract";
import CreateCustomerPage from "../pages/create-customer";
import UpdateCustomerPage from "../pages/update-customer";
import DetailLoanRequestPage from "../pages/detail-loan-request";
import LoanRequestPage from "../pages/loan-request";
import CreateLoanRequestPage from "../pages/create-loan-request";
import CustomerDetailPage from "../pages/customer-detail";
import DetailAssetsPage from "../pages/detail-assets";
import DocxEditor from "../pages/newpage";

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
        { path: "customers/:id", element: <CustomerDetailPage /> },
        { path: "customers/add", element: <CreateCustomerPage /> },
        {
          path: "customers/edit/:customerId",
          element: <UpdateCustomerPage />,
        },
        { path: "editor", element: <DocxEditor /> },
        { path: "brokers", element: <BrokerPage /> },
        { path: "other", element: <OtherPage /> },
        { path: "appraisal-plans", element: <AppraisalPlansPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "briefs", element: <BriefPage /> },
        { path: "briefs/:id", element: <BriefDetailPage /> },
        { path: "personal-appraisal", element: <PersonalAppraisalPage /> },
        { path: "personal-appraisal/:id", element: <PersonalAppDetailPage /> },
        { path: "personal-appraisal/:id/calc", element: <PersonalCalcPage /> },
        { path: "loan-request", element: <LoanRequestPage /> },
        { path: "loan-request/:id", element: <DetailLoanRequestPage /> },
        { path: "loan-request/create", element: <CreateLoanRequestPage /> },
        { path: "appraisal-criteria", element: <OtherPage /> },
        { path: "report_on_employee", element: <OtherPage /> },
        { path: "report_on_broker", element: <OtherPage /> },
        { path: "assets", element: <AssetsPage /> },
        { path: "assets/:id", element: <DetailAssetsPage /> },
        { path: "evaluation-form", element: <EvaluationPage /> },
        { path: "priority", element: <PriorityPage /> },
        { path: "loan-entrustment", element: <LoanEntrustmentPage /> },
        { path: "loan-contract", element: <LoanContractPage /> },
        { path: "trust-contract", element: <TrustContractPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);

  return routes;
}
