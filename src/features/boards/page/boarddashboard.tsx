import { Button } from "@/components/ui/button";
import InfoCard from "@/shared/components/InfoCard";
import { type Boards} from "@/features/boards/types/boards.types";
import { PlusCircle, Settings } from "lucide-react";
import useGetAllBoards from "../hooks/boardsHooks";
import { useNavigate ,useParams } from "react-router-dom";
import { useWorkspaceStore } from "@/features/workspace/store/workspaceStore";

export default function Boards()
{
    const { workspaceSlug } = useParams()

    const workspaceStore = useWorkspaceStore();
    
    const boards = useGetAllBoards(workspaceStore.currentWorkspaceId!)

    const navigate = useNavigate();
    function handleSetting()
    {
        workspaceStore.setCurrentWorkspaceDetailsTab("general");
        return navigate(`/dashboards/workspace/${workspaceSlug}/settings`, {replace:true});
    }

    return (
        <section className="m-8">
            <div className="flex flex-wrap gap-3 justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold">Flowboards</h2>
                    <p className="text-sm">Manage your orginization collaborative boards and teams.</p>
                </div>

                <div className="flex gap-3 justify-center items-center" onClick={handleSetting}>
                    <Settings className="cursor-pointer"/>
                    <Button className={"px-5 py-5 cursor-pointer font-medium"}>
                    <PlusCircle className="h-5 w-5"/>
                    Create New Board
                    </Button>
                </div>
            </div>


            {boards.isSuccess &&
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-8">
                {boards.data.map((board:Boards) => (
                        <InfoCard 
                            key={board.id}
                            heading={board.name}
                            createdby=""
                            membercout={12}
                            onClick={()=> {
                                
                            }}
                        />
                    )
                )}
                <InfoCard onClick={()=> alert("")}/>
            </div>}

            {/* <PopUp open={open} onOpenChange={()=>setOpen(prev=> !prev)}>
                <WorkspaceForm
                    onSucess={()=> setOpen(prev=> !prev)}
                />
            </PopUp> */}
        </section>
    )
}