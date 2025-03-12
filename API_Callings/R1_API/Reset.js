import apiClient from "./axios-client";

export const sendResetOtp = async (payload) => {
    try {
        const result = await apiClient.post('/otp/reset-password', payload);
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
        if(e.response?.data) {
            throw {
                name: 'app',
                ...e.response.data,
            }
        }
        throw e;
    }
};

export const confirmResetPassword = async (payload) => {
    try {
        const result = await apiClient.post('/otp/confirm-reset-password', payload);
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
        if(e.response?.data) {
            throw {
                name: 'app',
                ...e.response.data,
            }
        }
        throw e;
    }
};