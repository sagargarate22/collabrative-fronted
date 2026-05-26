import { useQuery } from "@tanstack/react-query";
import BoardService from "../service/boardsService";

export default function useGetAllBoards(workspaceId: string){
    return useQuery(
        {
        queryKey: ['boards', workspaceId],
        queryFn: () => BoardService.getAllBoards(workspaceId),
        enabled: !!workspaceId
        }   
    )
}