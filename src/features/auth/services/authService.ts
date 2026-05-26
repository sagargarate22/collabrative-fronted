import {apiClient} from '@/shared/api'
import type { LoginFormData, RegisterFormData } from '../types/auth.schema';
import type { User } from '../types/auth.types';
import type { ApiResponse } from '@/shared/types/shared.types';

export default class AuthService {
    static async login(request: LoginFormData): Promise<User | null>
    {
        const { data } = await apiClient.post<ApiResponse<User | null>>('/auth/login', request);
        return data?.data;
    }

    static async register(request: RegisterFormData): Promise<User | null>
    {
        const {data} = await apiClient.post<ApiResponse<User | null>>('auth/register', request);
        return data?.data;
    }
}
