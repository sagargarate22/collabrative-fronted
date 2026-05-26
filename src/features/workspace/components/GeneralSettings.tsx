import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import TextField from "@/shared/components/TextField";
import { CopyIcon, Loader, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useGetWorkspace, useUpdateWorkspace } from "../hooks/workspaceHooks";
import { updateWokspaceSchema, type UpdateworkspaceFormData } from "../types/workspace.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";

export default function WorkspaceGeneralSettings({
    workspaceSlug
}: {
    workspaceSlug: string
}) {
    const upateworkspace = useUpdateWorkspace();
    const workspaceData = useGetWorkspace(workspaceSlug);

    const form = useForm<UpdateworkspaceFormData>(
        {
            resolver: zodResolver(updateWokspaceSchema),
            defaultValues: {
                name: "",
            }
        }
    )

    const onSubmit = async (data: UpdateworkspaceFormData) => {
        await upateworkspace.mutateAsync({
            workspaceId: workspaceData.data?.id!,
            name: data.name
        })
    }

    const initialized = useRef(false);
    console.log(upateworkspace.isPending)

    useEffect(() => {

        if (
            workspaceData.data &&
            !initialized.current
        ) {
            form.reset({
                name: workspaceData.data.name,
            });

            initialized.current = true;
        }

    }, [workspaceData.data, form]);

    function handleCopy() {
        navigator.clipboard.writeText(workspaceData.data?.slug!);
    }

    return (
        <div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle className="text-lg">General Settings</CardTitle>
                </CardHeader>
                <CardContent className="max-w-200 relative">
                    {upateworkspace.isPending || workspaceData.isLoading && (
                        <div className="absolute top-20 left-90 -translate-x-1/2 -translate-y-1/2 z-50">
                            <Loader/>
                        </div>
                    )}
                    
                    <form id="workspace-form" onSubmit={form.handleSubmit(onSubmit)} className={`z-20 ${workspaceData.isLoading || upateworkspace.isPending} ? : "opacity-20" : ""`}>
                        <div className="flex justify-center items-center gap-3">
                            <TextField
                                name="name"
                                label="Workspace Name"
                                description="This will be visible to all members of the workspaces."
                                control={form.control}
                                placeholder="Enter Workspace Name"
                            />
                            <Button className="text-md px-5 py-5 w-20 cursor-pointer" type="submit" form="workspace-form">
                                {upateworkspace.isPending ? <Loader/> : "Save"}
                            </Button>
                        </div>
                    </form>
                    <hr className="my-5" />
                    <Field className={`${workspaceData.isLoading} ? : "opacity-10" : ""}`}>
                        <FieldLabel>Workspace Slug</FieldLabel>
                        <InputGroup className="py-5 pr-2 border-gray-800">
                            <InputGroupInput disabled={true} placeholder={workspaceData.data?.slug!} className="" />
                            <InputGroupAddon align="inline-end">
                                <CopyIcon className="h-5 w-5 cursor-pointer text-black" onClick={handleCopy} />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                </CardContent>
            </Card>
            <Card className="mt-8 rounded-md bg-background text-foreground ring-1 ring-red-600/20 w-[35%] px-10 py-10 
        flex gap-5">
                <div className="flex justify-start items-center gap-3">
                    <TriangleAlert className="text-destructive" />
                    <p className="text-destructive text-lg font-semibold">Danzer Zone</p>
                </div>
                <h2>Once you delete a workspace, there is no going
                    back. Please be certain.</h2>
                <Button className="bg-destructive text-white text-lg font-semibold py-5 cursor-pointer">Delete Workspace</Button>
            </Card>
        </div>
    )
}