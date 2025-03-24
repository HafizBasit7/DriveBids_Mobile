import { chatBaseUrl } from "../BaseURL/chat-baseurl";

export const getChats = async (page = 1, limit = 10) => {
    try {
        const result = await chatBaseUrl.get(`/chat/chats?page=${page}&limit=${limit}`);
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