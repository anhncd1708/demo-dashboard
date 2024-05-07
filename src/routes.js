import React, { useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Cookies from "js-cookie";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";

export default function Router() {
    const ProtectedRouteAuthen = ({ roles, children }) => {
        const token = localStorage.getItem("token");
        const [user, setUser] = useState(null);
        let userTmp = Cookies.get('user');

        if (userTmp) {
            setUser(JSON.parse(userTmp));
            console.log(user)
        }

        try {
            if (!token || !user.role) {
                return <Navigate to="/" replace />;
            } else if (roles.includes(user.role)) {
                return <>{children}</>;
            }
        } catch (error) {
            return <Navigate to="/" replace />;
        }
    };


    return useRoutes([
        {
            path: "/",
            element: <Navigate to="/authentication/log-in" replace />
        },
        {
            path: "/authentication/log-in",
            element: <Login />,
        },
        {
            path: "/authentication/sign-in",
            element: "",
        },
        {
            path: "admin/",
            children: [
                {
                    path: "dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "employees",
                    element: "",
                },
            ]
        }
    ])
}