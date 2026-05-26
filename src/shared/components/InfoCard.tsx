import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { LayoutDashboard, Plus, Users } from "lucide-react"

export default function InfoCard(props: {
    heading?: string,
    createdby?:string,
    membercout?:number,
    boardcount?:number
    onClick: ()=> void
}){
    return (
        <section>
            {props.heading ? (
                <Card className="w-full rounded-lg px-2 border-r-4 border-b-4 card-elevation cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out" onClick={props.onClick}>
                    <CardHeader className="flex gap-5 items-center mb-5">
                        <div className="bg-[#B55D00] w-12 h-12 rounded-md">
                            <p className="flex items-center justify-center w-full h-full text-3xl font-medium text-white ">{props.heading[0].toLocaleUpperCase()}</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{props.heading}</p>
                            <p className="text-[13px]">Owned by {props.createdby}</p>
                        </div>  
                    </CardHeader>
                    <CardFooter className="bg-white flex justify-between py-5">
                        <div className="flex items-center gap-0.5">
                            <Users className="w-4.5 h-3.5"/>
                            <p className="text-[11px] mt-0.5">{props.membercout} Members</p>
                        </div>
                        {props.boardcount !== null && (
                            <div className="flex items-center gap-0.5">
                                <LayoutDashboard className="w-4.5 h-3.5"/>
                                <p className="text-[11px] mt-0.5">{props.boardcount} Boards</p>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            ) : (
                <Card className="w-full min-h-[165.27px] rounded-lg px-2 cursor-pointer ring-0 border-2 border-dashed! flex items-center justify-center hover:bg-muted-foreground/30 group transition-all duration-300 ease-in-out hover:scale-95" onClick={props.onClick}>
                    <CardContent className="flex flex-col items-center gap-5 h-full">
                        <Plus className="w-14 h-14 rounded-full text-white bg-muted-foreground/30 group-hover:bg-white group-hover:text-muted-foreground transition-all duration-300 ease-in-out"/>
                        <p className="text-lg text-muted-foreground group-hover:text-white transition-all duration-300 ease-in-out">Add Another Workspace</p>
                    </CardContent>
                </Card>
            )}
        </section>
    )
}