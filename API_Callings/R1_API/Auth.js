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
        if(e.response?.data) {
            throw {
                name: 'app',
                ...e.response.data,
            }
        }
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
        if(e.response?.data) {
            throw {
                name: 'app',
                ...e.response.data,
            }
        }
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
        if(e.response?.data) {
            throw {
                name: 'app',
                ...e.response.data,
            }
        }

        throw e;
    }
};

export const updatePassword = async (payload) => {
    try {
        const result = await apiClient.post('/auth/updatePassword', payload);
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

export const updateProfile = async (payload) => {
    try {
        const result = await apiClient.post('/auth/updateProfile', payload);
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

export const getMyNotifications = async (page = 1, limit = 10) => {
    try {
        const result = await apiClient.get(`/auth/notifications?page=${page}&limit=${limit}`);
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


