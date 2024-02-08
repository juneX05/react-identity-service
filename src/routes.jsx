import {createBrowserRouter, Outlet} from "react-router-dom";
import Login from "./components/views/core/auth/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./components/views/system/dashboard/Dashboard.jsx";
import DomainList from "./components/views/system/domain/DomainList.jsx";
import React from "react";
import DomainCreate from "./components/views/system/domain/DomainCreate.jsx";
import UserProfile from "./components/views/core/auth/UserProfile.jsx";
import UserList from "./components/views/core/user/UserList.jsx";


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
            },
            {
                path:"/profile",
                element: <UserProfile/>
            },
            {
                path:"/users/list",
                element: <UserList/>
            }
        ]
    }
])

export default router