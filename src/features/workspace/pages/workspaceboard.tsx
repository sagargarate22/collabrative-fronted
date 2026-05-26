
import { Button } from "@/components/ui/button";
import InfoCard from "@/shared/components/InfoCard";
import { PlusCircle } from "lucide-react";
import { useGetAllWorkspaces } from "../hooks/workspaceHooks";
import type { Workspace } from "../types/workspace.types";
import { useState } from "react";
import WorkspaceForm from "../components/WorkspaceForm";
import { PopUp } from "@/shared/components/PopUp";
import { useNavigate } from "react-router-dom";
import { useWorkspaceStore } from "../store/workspaceStore";

export default function Workspace()
{
    const navigate = useNavigate();
    const workspaces = useGetAllWorkspaces();
    const [open, setOpen] = useState(false);

    const workspaceStore = useWorkspaceStore();

    return(
        <section className="m-8">
            <div className="flex flex-wrap gap-3 justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold">Workspaces</h2>
                    <p className="text-sm">Manage your orginization collaborative boards and teams.</p>
                </div>
                <Button className={"px-5 py-5 cursor-pointer font-medium"} onClick={()=> setOpen(prev=> !prev)}>
                    <PlusCircle className="h-5 w-5"/>
                    Create New Workspace
                </Button>
            </div>


            {workspaces.isSuccess &&
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-8">
                {workspaces.data.map((workspace:Workspace) => (
                        <InfoCard 
                            key={workspace.id}
                            heading={workspace.name}
                            createdby={workspace.ownerName}
                            membercout={workspace.memberCount}
                            boardcount={workspace.boardCount}
                            onClick={()=> {
                                // storing selected workspace to state for future pages
                                workspaceStore.setCurrentWorkspaceId(workspace.id);
                                navigate(`/dashboards/boards/${workspace.slug}`, {replace: true});
                            }}
                        />
                    )
                )}
                <InfoCard onClick={()=> setOpen(prev=> !prev)}/>
            </div>}

            <PopUp open={open} onOpenChange={()=>setOpen(prev=> !prev)}>
                <WorkspaceForm
                    onSucess={()=> setOpen(prev=> !prev)}
                />
            </PopUp>
        </section>
    )
}