import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, LogOut, Settings, type LucideIcon } from "lucide-react"
import { useState } from "react";

import logo from '@/assets/flowboard-logo.png';
import clsx from "clsx";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useNavigate } from "react-router-dom";


const data: {id: number, name: string, icon: LucideIcon}[] = [
    {
        id: 1,
        name: "Dashboards",
        icon: LayoutDashboard
    }, 
    {
        id: 2,
        name: "Settings",
        icon: Settings
    }
]

export default function AppSideBar() {

    const [current, setCurrent] = useState(data[0].id);
    const navigate = useNavigate();
    const authStore = useAuthStore();

    function handleLogout(){
        if(authStore.user){
            authStore.logout();
        }
        navigate('/', {replace:true});
    }

    function handleClick(data: {id: number, name: string, icon: LucideIcon}){
        setCurrent(data.id);
        navigate(`/${data.name.toLowerCase()}`, {replace:true});
    }
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu> 
                    <div className="w-full px-4"> 
                        <SidebarMenuItem className="flex justify-start items-center gap-3 mt-5 w-full">
                            <div className="flex justify-center items-center w-11 h-11"> 
                                <img src={logo} className="object-contain w-full h-full" />
                            </div>

                            <div className="flex flex-col justify-center">
                                <p className="text-lg font-bold leading-none mb-1">Flowboard</p>
                                <p className="text-sm leading-none text-muted-foreground">Product Team</p>
                            </div>
                        </SidebarMenuItem>
                    </div>
                </SidebarMenu>
            </SidebarHeader>
            
            <SidebarContent className="mt-4 ml-2">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data && data.map((d)=>{
                                const isActive = d.id === current;
                                const buttonStyle = clsx(
                                    "px-12 cursor-pointer hover:bg-accent-foreground/50",
                                    {
                                        "border-l-3":  isActive,
                                        "hover:text-muted-foreground": isActive === false,
                                        "text-muted-foreground" : isActive === false,
                                        "rounded-l-none" : isActive
                                    }
                                )
                                const iconStyle = clsx(
                                    "absolute left-5 h-5 w-5 cursor-pointer",
                                    {
                                        "text-muted-foreground" : isActive === false,
                                    }
                                )
                                return (
                                <SidebarMenuItem key={d.id}>
                                    <div className="flex justify-start items-center mb-3">
                                        {d.icon && <d.icon className={iconStyle}/>}
                                        <SidebarMenuButton isActive={isActive} className={buttonStyle} size="lg" 
                                        onClick={()=> {
                                            handleClick(d);
                                        }}>
                                            {d.name}
                                        </SidebarMenuButton>
                                    </div>
                                </SidebarMenuItem>
                            )})}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <div className="flex justify-start items-center mb-3">
                                    <LogOut className="absolute h-5 w-5 left-4 cursor-pointer"/>
                                    <SidebarMenuButton isActive={true} className="px-12 cursor-pointer hover:bg-accent-foreground/50" size="lg" onClick={handleLogout}>
                                        Logout
                                    </SidebarMenuButton>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}