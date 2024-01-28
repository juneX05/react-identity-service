import {createBrowserRouter, Outlet} from "react-router-dom";
import Login from "./components/views/login/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./components/views/dashboard/Dashboard.jsx";
import DomainList from "./components/views/domain/DomainList.jsx";
import React from "react";
import DomainCreate from "./components/views/domain/DomainCreate.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        element: <ProtectedRoute children={<Outlet/>}/>,
        children:[
            {
                path:"/dashboard",
                element: <Dashboard/>
            },
            {
                path:"/domains/list",
                element: <DomainList/>
            },
            {
                path:"/domains/create",
                element: <DomainCreate/>
            }
        ]
    }
])

export default router