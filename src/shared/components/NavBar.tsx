import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BellIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarBadge } from "@/components/ui/avatar";

export default function NavBar(){
    return (
    <header className="flex h-16 w-full shrink-0 justify-between items-center gap-2 border-b px-4 bg-white">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4 bg-black  my-6"
            />
            <div className="relative w-full max-w-90 flex items-center justify-start">
                <Search className="absolute h-5 w-5 left-3 text-muted-foreground cursor-pointer"/>
                <Input
                type="text"
                placeholder="Search..."
                className="bg-background focus-visible:ring-1 px-10 focus-visible:border-blue-700"
            />
            </div>
          </div>

          <div className="flex justify-end items-center gap-5 mr-1.5">
            <Button className={"w-15 cursor-pointer"}>
            Invite
            </Button>
                
            <div className="relative">
                <p className="absolute bottom-3 left-3 bg-red-600 rounded-2xl w-4 h-4 text-center text-white cursor-pointer">1</p>
                <BellIcon className="cursor-pointer"/>
            </div>

            <Avatar className="bg-red-300 cursor-pointer">
                <p className="flex items-center justify-center w-full text-sm">SG</p>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </div>

    </header>
    )
}