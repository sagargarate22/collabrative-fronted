import {apiClient} from '@/shared/api'
import type { LoginFormData } from '../types/auth.schema';
import type { User } from '../types/auth.types';

export default class AuthService {
    static async login(request: LoginFormData): Promise<User | null>
    {
        const { data } = await apiClient.post<User | null>('/auth/login', request);
        return data
    }
}