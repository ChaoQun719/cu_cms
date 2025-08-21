import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from '@/pages/login';
import BasicLayout from "@/components/layout/BasicLayout";
import Home from "@/pages/home";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: React.createElement(Login),
    },
    {
        path: '/',
        element: React.createElement(BasicLayout),

        children: [
            {
                path: '/',
                element: React.createElement(Home),
            },
        ],
    },
],
    {
        // basename: process.env.NODE_ENV === 'production' ? '/test/mindcore/' : '',
        basename: import.meta.env.VITE_BASE_NAME,
    }
);