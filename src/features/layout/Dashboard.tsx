
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/features/auth/store/authStore"
import AppSideBar from "@/shared/components/AppSideBar"
import NavBar from "@/shared/components/NavBar";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Dashboard()
{
    const location = useLocation();
    const authStore = useAuthStore();
    if(!authStore.user){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return (
        <SidebarProvider
            style={
                {
                "--sidebar-width": "20rem",
                "--sidebar-width-mobile": "20rem",
                } as React.CSSProperties
            }
            className=""
        >
            <AppSideBar/>
            <SidebarInset>
                <NavBar/>
                <Outlet/>
            </SidebarInset>

        </SidebarProvider>
    )    
}

