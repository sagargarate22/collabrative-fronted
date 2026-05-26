import {create} from 'zustand';
import type { Workspace, WorkspaceStore } from '../types/workspace.types';
import { persist } from 'zustand/middleware';

export const useWorkspaceStore = create<WorkspaceStore>()(persist((set) =>({
    allWorkspaces: null,
    currentWorkspaceId: null,
    currentWorkspaceDetailsTab: null,
    
    setWorkspaces: (data: Array<Workspace>) => set({
        allWorkspaces: data
    }),

    setCurrentWorkspaceId: (id: string) => set({
        currentWorkspaceId: id
    }),

    setCurrentWorkspaceDetailsTab: (tab: string) => set((state) => (
        state.currentWorkspaceDetailsTab === tab
            ? state
            : { currentWorkspaceDetailsTab: tab }
    ))
}),
{
    name: "workspace-storage"
}));


