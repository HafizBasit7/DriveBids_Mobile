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

export const getChatMessages = async (chatId, page = 1, limit = 10) => {
    try {
        const result = await chatApiClient.get(`/chat/messages?chatId=${chatId}&page=${page}&limit=${limit}`);
        const resultData = result.data;

        if (!resultData.status) {
            throw {
                name: 'app',
                message: resultData.message,
            };
        }

        return resultData;
    } catch (e) {
        if (e.response?.data) {
            throw {
                name: 'app',
                ...e.response.data,
            };
        }
        throw e;
    }
};

export const sendMessage = async (chatId, message) => {
    try {
        const result = await chatApiClient.post(`/chat/sendMessage`, { chatId, message });
        const resultData = result.data;

        if (!resultData.status) {
            throw {
                name: 'app',
                message: resultData.message,
            };
        }

        return resultData;
    } catch (e) {
        if (e.response?.data) {
            throw {
                name: 'app',
                ...e.response.data,
            };
        }
        throw e;
    }
};

export const getChatId = async ({userId, carId}) => {
    try {
        const result = await chatApiClient.post(`/chat/getChatId`, { userId, carId });
        const resultData = result.data;

        if (!resultData.status) {
            throw {
                name: 'app',
                message: resultData.message,
            };
        }

        return resultData;
    } catch (e) {
        if (e.response?.data) {
            throw {
                name: 'app',
                ...e.response.data,
            };
        }
        throw e;
    }
};