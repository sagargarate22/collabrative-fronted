import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "../features/auth/pages/PublicRoute";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <PublicRoute/>,
            children: [
                {path: '/login', element: <LoginPage/>},
                {path: '/register', element: <RegisterPage/>}
            ]
        }
    ]
)
