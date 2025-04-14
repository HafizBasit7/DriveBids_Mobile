import apiClient from "./axios-client";

export const getDrafts = async (page = 1, limit = 10) => {
    try {
        const result = await apiClient.get(`/car/drafts?page=${page}&limit=${limit}`);
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

export const postAd = async (carId) => {
    try {
        const result = await apiClient.post(`/car/postAd`, {carId});
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

export const listCars = async (page = 1, limit = 10, type = 'recent', lng, lat) => {
    try {
        const result = await apiClient.get(`/car/list?page=${page}&limit=${limit}&type=${type}&lng=${lng}&lat=${lat}`);
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

export const getCar = async (carId) => {
    try {
        const result = await apiClient.get(`/car/car/${carId}`);
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

export const getCarInspectionReport = async (carId) => {
    try {
        const result = await apiClient.get(`/car/inspectionReport/${carId}`);
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

export const getCarDamageReport = async (carId) => {
    try {
        const result = await apiClient.get(`/car/damageReport/${carId}`);
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

export const getCarBiddingHistory = async (carId) => {
    try {
        const result = await apiClient.get(`/car/getCarBiddingHistory/${carId}`);
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

export const getMyCarBiddingHistory = async (carId) => {
    try {
        const result = await apiClient.get(`/car/getMyCarBiddingHistory/${carId}`);
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

export const listCarsByBidCount = async (page = 1, limit = 10, lng, lat) => {
    try {
        const result = await apiClient.get(`/car/listByBidCount?page=${page}&limit=${limit}&lng=${lng}&lat=${lat}`);
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

export const listMyAds = async (page = 1, limit = 10) => {
    try {
        const result = await apiClient.get(`/car/myAds?page=${page}&limit=${limit}`);
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

export const listMyBids = async (page = 1, limit = 10, type = 'open') => {
    try {
        const result = await apiClient.get(`/car/myBids?page=${page}&limit=${limit}&type=${type}`);
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

export const getCarOwnerCars = async (page = 1, limit = 10, userId) => {
    try {
        const result = await apiClient.get(`/car/getCarOwnerCars/${userId}?page=${page}&limit=${limit}`);
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

export const getSimilarCars = async (page = 1, limit = 10, make) => {
    try {
        const result = await apiClient.get(`/car/getSimilarCars/${make}?page=${page}&limit=${limit}`);
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

export const searchCars = async (params = {}, page = 1, limit = 10, lng, lat) => {
    try {
        const queryString = new URLSearchParams(params).toString();
        const result = await apiClient.get(`/car/searchCars?page=${page}&limit=${limit}&${queryString}&lng=${lng}&lat=${lat}`);
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

export const getCompletedDeals = async (page = 1, limit = 10, type = 'buy') => {
    try {
        const result = await apiClient.get(`/car/completedDeals?page=${page}&limit=${limit}&type=${type}`);
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