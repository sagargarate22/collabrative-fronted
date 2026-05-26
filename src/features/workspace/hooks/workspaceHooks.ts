import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import WorskpaceService from "../services/workspaceService"

export default function useCreateWorkspace(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: WorskpaceService.createWorkspace,
        onSuccess: (()=> {
            queryClient.invalidateQueries({queryKey: ['workspaces']})
        }),
    })
}

export function useUpdateWorkspace()
{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: WorskpaceService.updateWorkspace,
        // onSuccess: (()=> {
        //     queryClient.invalidateQueries({queryKey: ['workspace', workspaceSlug]})
        // })
    })
}

export function useGetAllWorkspaces(){

    return useQuery({
        queryKey: ['workspaces'],
        queryFn: WorskpaceService.getAllWorskapces,
    })
}

export function useGetWorkspace(workspaceSlug: string){
    return useQuery({
        queryKey: ['workspace', workspaceSlug],
        queryFn: ()=> WorskpaceService.getWorkspace(workspaceSlug),
        enabled: !!workspaceSlug
    })
}

export function useGetWorkspaceMembers(workspaceId: string)
{
    return useQuery(
        {
            queryKey: ['workspace-members', workspaceId],
            queryFn: ()=> WorskpaceService.getWorkspaceMembers(workspaceId),
            enabled: !!workspaceId
        }
    )
}