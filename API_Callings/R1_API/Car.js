import apiClient from "./axios-client";

export const getDrafts = async () => {
    try {
        const result = await apiClient.get('/car/drafts');
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


export const saveDraft = async (payload) => {
    try {
        const result = await apiClient.post('/car/saveDraft', payload);
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

export const loadDraft = async (draftId) => {
    try {
        const result = await apiClient.get(`/car/loadDraft/${draftId}`);
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