import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Home} from './pages/Home.tsx'
import {About} from "@/pages/About.tsx";
import {Contact} from "@/pages/Contact.tsx";
import {ErrorPage} from "@/pages/ErrorPage.tsx";
import AuthenticationPage from "@/pages/Auth.tsx";

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
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
