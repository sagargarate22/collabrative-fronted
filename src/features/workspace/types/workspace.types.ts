import type { User } from "@/features/auth/types/auth.types";


export interface WorkspaceStore{
    allWorkspaces: Array<Workspace> | null;
    currentWorkspaceId: string | null;
    currentWorkspaceDetailsTab: string | null;


    setWorkspaces: (data: Array<Workspace>) => void;
    setCurrentWorkspaceId: (id: string) => void;
    setCurrentWorkspaceDetailsTab: (tab: string) => void;
}

export interface Workspace{
    id: string;
    name: string;
    slug: string;
    ownerId: string;
    ownerName: string;
    memberCount: number;
    boardCount: number;
    createdAt: string;
}

export interface WorkspaceMembers
{
    id: string;
    workspaceId: string;
    userId: string;
    role: string;
    joinedAt: Date
    user: User
}