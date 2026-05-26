import { apiClient } from "@/shared/api";
import type { Workspace, WorkspaceMembers } from "../types/workspace.types";
import type { ApiResponse } from "@/shared/types/shared.types";

export default class WorskpaceService{
    static async createWorkspace(request:{name: string}):Promise<Workspace>{
        const {data} = await apiClient.post<ApiResponse<Workspace>>(`/workspaces`, request)
        return data?.data;
    }

    static async getAllWorskapces():Promise<Workspace[]>{
        const {data} = await apiClient.get<ApiResponse<Workspace[]>>('/workspaces')
        return data?.data;
    }

    static async getWorkspace(workspaceSlug: string):Promise<Workspace>{
        const {data} = await apiClient.get<ApiResponse<Workspace>>(`/workspaces/${workspaceSlug}`)
        return data?.data;
    }

    static async updateWorkspace(request:{workspaceId: string, name: string}):Promise<Workspace>{
        const {data} = await apiClient.patch<ApiResponse<Workspace>>(`/workspaces/${request.workspaceId}`, {name: request.name})
        return data?.data;
    }

    static async getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMembers[]>
    {
        const {data} = await apiClient.get<ApiResponse<WorkspaceMembers[]>>(`/workspaces/${workspaceId}/members`)
        console.log(data.data);
        return data?.data;
    }

}