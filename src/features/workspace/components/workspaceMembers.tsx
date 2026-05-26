import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetWorkspaceMembers } from "../hooks/workspaceHooks";
import { Loader, Loader2Icon, LoaderCircle, UserPlus } from "lucide-react";
import type { WorkspaceMembers } from "../types/workspace.types";
import { useWorkspaceStore } from "../store/workspaceStore";
import { Button } from "@/components/ui/button";

export default function WorkspaceMembers()
{
    const currentWorkspaceId = useWorkspaceStore((state) => state.currentWorkspaceId);

    const workspaceMembers = useGetWorkspaceMembers(currentWorkspaceId!);

    return (
        <Card className="h-110 mt-5">
            <CardHeader className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-lg">Members</CardTitle>
                    <CardDescription className="text-sm">There are currently no members in this workspace.</CardDescription>
                </div>
                <Button className={"px-5 py-5 cursor-pointer"}>
                    <UserPlus/>
                    Add New Member
                </Button>
            </CardHeader>
            <CardContent>
                <div className="">
                    <Table className="mt-5 border-b abslulte">
                        <TableHeader>
                            <TableRow className="cursor-pointer bg-background">
                                <TableHead className="text-center hover:bg-muted/50">Name</TableHead>
                                <TableHead className="text-center hover:bg-muted/50">Email</TableHead>
                                <TableHead className="text-center hover:bg-muted/50">Role</TableHead>
                                <TableHead className="text-center hover:bg-muted/50">Joined At</TableHead>
                            </TableRow>
                        </TableHeader>
                        
                        <TableBody>
                            {workspaceMembers.isLoading && (
                                <TableRow >
                                    <TableCell colSpan={5}>
                                        <div className="flex justify-center items-center py-10">
                                                <Loader className="h-6 w-6 animate-spin" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                            
                            {workspaceMembers.isSuccess && workspaceMembers.data.map((member: WorkspaceMembers) => (
                                <TableRow key={member.id}>
                                    <TableHead className="text-center hover:bg-muted/50">{member.user.displayName}</TableHead>
                                    <TableHead className="text-center hover:bg-muted/50">{member.user.email}</TableHead>
                                    <TableHead className="text-center hover:bg-muted/5 flex justify-center items-center">
                                        <p className="rounded bg-primary text-white w-15 text-sm" >
                                            {member.role}
                                        </p>
                                    </TableHead>
                                    <TableHead className="text-center hover:bg-muted/50">{new Date(member.joinedAt).toLocaleDateString()}</TableHead>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
