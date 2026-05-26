import axios from "axios";


export default function getApiAxiosError(apiError : Error): string{
    if (axios.isAxiosError(apiError))
    {
            return apiError.response?.data?.Errors[0] ?? "Something Went Wrong.";
    }

    return "Something Went Wrong."
}