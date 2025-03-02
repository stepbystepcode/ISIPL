import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter, Navigate,
    RouterProvider,
} from "react-router-dom";
import {Home} from './pages/Home.tsx'
import {About} from "@/pages/About.tsx";
import {Contact} from "@/pages/Contact.tsx";
import {ErrorPage} from "@/pages/ErrorPage.tsx";
import AuthenticationPage from "@/pages/Auth.tsx";
import {Dashboard} from "@/pages/Dashboard.tsx";
import {Profile} from "@/pages/dashboard/Profile.tsx";
import {Schedule} from "@/pages/dashboard/Schedule.tsx";
import {Analysis} from "@/pages/dashboard/Analysis.tsx";
import {Evaluation} from "@/pages/dashboard/Evaluation.tsx";
import {Management} from "@/pages/dashboard/Management.tsx";
import {Settings} from "@/pages/dashboard/Settings.tsx";
import {Feedback} from "@/pages/dashboard/Feedback.tsx";
import {Abstraction} from "@/pages/dashboard/Abstraction.tsx";
import {Understanding} from "@/pages/dashboard/Understanding.tsx";
import {Criticism} from "@/pages/dashboard/Criticism.tsx";
import {Hypothesis} from "@/pages/dashboard/Hypothesis.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/login",
        element: <AuthenticationPage />,
    },
    {
        path: '/register',
        element: <AuthenticationPage />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard/profile" replace />
            },
            {
                path: '/dashboard/profile',
                element: <Profile />,
            },
            {
                path: '/dashboard/assistant',
                element: <Navigate to={'/dashboard/schedule'} replace />,
            },
            {
                path: '/dashboard/schedule',
                element: <Schedule />,
            },
            {
                path: '/dashboard/feedback',
                element: <Feedback />,
            },
            {
                path: '/dashboard/analysis',
                element: <Analysis />,
            },
            {
                path: '/dashboard/evaluation',
                element: <Evaluation />,
            },
            {
                path: '/dashboard/management',
                element: <Management />,
            },
            {
                path: '/dashboard/settings',
                element: <Settings />,
            },
            {
                path: '/dashboard/understanding',
                element: <Understanding />,
            },
            {
                path: '/dashboard/abstraction',
                element: <Abstraction />,
            },
            {
                path: '/dashboard/criticism',
                element: <Criticism />,
            },
            {
                path: '/dashboard/hypothesis',
                element: <Hypothesis />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
