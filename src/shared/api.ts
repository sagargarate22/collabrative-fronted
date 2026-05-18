import axios from 'axios';


export const apiClient = axios.create({
    baseURL: "https://localhost:7218/api/"
})

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
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
                // window.location.href = '/login'
            }
        }

        return Promise.reject(error.response.data.Errors[0]);
    }
)