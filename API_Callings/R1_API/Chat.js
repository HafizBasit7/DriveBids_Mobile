import { chatApiClient } from "./axios-client";

export const getChats = async (page = 1, limit = 10, type = 'buying') => {
    try {
        const result = await chatApiClient.get(`/chat/chats?page=${page}&limit=${limit}&type=${type}`);
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

export const getChatCarHead = async (chatId) => {
    try {
        const result = await chatApiClient.get(`/chat/getChatCarHead/${chatId}`);
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