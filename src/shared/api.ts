import { useAuthStore } from '@/features/auth/store/authStore';
import axios from 'axios';


export const apiClient = axios.create({
    baseURL: "https://localhost:7218/api/"
})


apiClient.interceptors.request.use(config => {
  const token = useAuthStore.getState().user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
    (res) => res,
    (error) => {
        if (axios.isAxiosError(error) && error.response)
        {
            const status = error.response.status;


            if (status === 401)
            {
                useAuthStore.getState().logout()
                window.location.href = '/login'
                console.log(error.response.headers);
                if(error.response.headers['TOKEN_EXPIRED'] === "true"){
                    
                }
            }
        }
        console.log(error);
        return Promise.reject(error);
    }
)