import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import TextField from "@/shared/components/TextField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createWorkspaceSchema, type CreateWorkspaceFormData } from "../types/workspace.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateWorkspace from "../hooks/workspaceHooks";
import getApiAxiosError from "@/shared/utils/ApiErrorMessage";

export default function WorkspaceForm(
    {onSucess} : {onSucess: ()=> void}
)
{
    const createWorkspace = useCreateWorkspace();
    const form = useForm<CreateWorkspaceFormData>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit: SubmitHandler<CreateWorkspaceFormData> = async (data) => {
        await createWorkspace.mutateAsync(data)
        form.reset();
        onSucess();
    }
    
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} id='workspace-form'>
            <DialogContent>
                <DialogHeader>
                    <DialogHeader className="font-semibold text-lg">
                        Workspace
                    </DialogHeader>
                    <DialogDescription className="text-sm">
                        Create your new workspace
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-3 mb-3">
                    <TextField
                        name="name"
                        label="Workspace Name"
                        control={form.control}
                        placeholder="Enter Workspace Name"
                    />
                </div>

                {createWorkspace.isError && (
                    <p className="text-sm text-red-500">{getApiAxiosError(createWorkspace.error)}</p>
                )}

                <Button className="text-md py-5 cursor-pointer" type="submit" form="workspace-form">
                    Create Workspace
                </Button>

            </DialogContent>
        </form>
    )
}