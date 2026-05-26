import {Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkspaceGeneralSettings from "../components/GeneralSettings";
import WorkspaceMembers from "../components/workspaceMembers";
import { useParams } from "react-router-dom";
import { useWorkspaceStore } from "../store/workspaceStore";

export default function WorkspaceDetails(){
    const {workspaceSlug} = useParams();
    const workspaceStore = useWorkspaceStore();

    function handleTabChange(value: string)
    {
        workspaceStore.setCurrentWorkspaceDetailsTab(value);
    }

    return (
        <main className="m-10">
            <section>
                <h2 className="text-3xl font-semibold">Workspace Details</h2>
                <p className="text-sm text-muted-foreground">Manage your team's workspace, member roles and security perferences.</p>
            </section>

            {/* tab section */}
            <section className="mt-5">
                <Tabs value={workspaceStore.currentWorkspaceDetailsTab} onValueChange={handleTabChange} className={"w-full"}>
                    <TabsList variant="line" className="w-full gap-10 border-b-2">
                        <TabsTrigger value="general" className="cursor-pointer">General</TabsTrigger>
                        <TabsTrigger value="members" className="cursor-pointer">Members</TabsTrigger>
                        <TabsTrigger value="invites" className="cursor-pointer">Invites</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">
                        <WorkspaceGeneralSettings 
                            workspaceSlug={workspaceSlug?? ""}
                        />
                    </TabsContent>
                    <TabsContent value="members">
                        <WorkspaceMembers/>
                    </TabsContent>
                    <TabsContent value="invites">
                        Reports
                    </TabsContent>
                </Tabs>
                
            </section>
        </main>
    )
}