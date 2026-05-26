import { apiClient } from "@/shared/api";
import type { ApiResponse } from "@/shared/types/shared.types";
import type { Boards } from "../types/boards.types";

export default class BoardService{
    static async getAllBoards(workspaceId: string): Promise<Boards[]>{
        const { data } = await apiClient.get<ApiResponse<Boards[]>>(`/workspaces/${workspaceId}/boards`)
        return data?.data;
    }
}