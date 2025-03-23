import axios from 'axios';
import { baseurl } from '../BaseURL/baseurl';
import { bidBaseUrl } from '../BaseURL/bidding-baseurl';
import { chatBaseUrl } from '../BaseURL/chat-baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Main Client
const apiClient = axios.create({
    baseURL: baseurl,
    headers: {
        'Content-Type': 'application/json',
    }
});

//Bid Client
export const bidApiClient = axios.create({
    baseURL: bidBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

//Chat Client
export const chatApiClient = axios.create({
    baseURL: chatBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Function to set the authorization token
export const setAuthToken = async (token) => {
    await AsyncStorage.setItem('token', token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    bidApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    chatApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = async () => {
    await AsyncStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
    delete bidApiClient.defaults.headers.common['Authorization'];
    delete chatApiClient.defaults.headers.common['Authorization'];
};


export default apiClient;