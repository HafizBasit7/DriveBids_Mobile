import { AxiosError } from "axios";
import apiClient from "./axios-client";

export const getUser = async () => {
    try {
        const result = await apiClient.get('/auth');
        const resultData = result.data;

        if(!resultData.status) {
            throw {
                name: 'app',
                message: resultData.message,
            };
        }

        return resultData; 
    }
    catch(e) {
        throw e;
    }
};

export const signupUser = async (payload) => {
    try {
        const result = await apiClient.post('/auth/signup', payload);
        const resultData = result.data;

        if(!resultData.status) {
            throw {
                name: 'app',
                message: resultData.message,
            };
        }

        return resultData;
    }
    catch(e) {
        throw e;
    }
};

export const loginUser = async (payload) => {
    try {
        const result = await apiClient.post('/auth/login', payload);
        const resultData = result.data;

        if(!resultData.status) {
            throw {
                name: 'app',
                message: resultData.message,
            };
        }

        return resultData;
    }
    catch(e) {
        throw e;
    }
};

