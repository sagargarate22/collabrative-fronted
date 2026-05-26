import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "../features/auth/pages/PublicRoute";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import Workspace from "@/features/workspace/pages/workspaceboard";
import Dashboard from "@/features/layout/Dashboard";
import Boards from "@/features/boards/page/boarddashboard";
import WorkspaceDetails from "@/features/workspace/pages/workspaceDetails";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <PublicRoute/>,
            children: [
                {path: '/login',index:true, element: <LoginPage/>},
                {path: '/register', element: <RegisterPage/>}
            ]
        },
        {
            path: "/dashboards",
            element: <Dashboard/>,
            children: [
                {path: '/dashboards', element: <Workspace/>},
                {path: '/dashboards/settings', element: <Workspace/>},
                {
                    path: '/dashboards/workspace/:workspaceSlug/settings',
                    element: <WorkspaceDetails/>,
                },
                {path: '/dashboards/boards', element: <Boards/>},
                {path: '/dashboards/boards/:workspaceSlug', element: <Boards/>}
            ]
        }
    ]
)
