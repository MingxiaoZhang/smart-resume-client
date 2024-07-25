import axios from 'axios';

interface LoginResponse {
    token?: string;
    error?: string;
}

interface RegisterResponse {
    token?: string;
    error?: string;
}


export const loginService = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${process.env.REACT_APP_API}/auth/login`, { username, password });
        return response.data;
    } catch (error) {
        return {error: String(error)};
    }
};

export const registerService = async (username: string, password: string): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(`${process.env.REACT_APP_API}/auth/register`, { username, password });
        return response.data;
    } catch (error) {
        return {error: String(error)};
    }
};