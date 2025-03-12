import axios from 'axios';
import { baseurl } from '../BaseURL/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
    baseURL: baseurl,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Function to set the authorization token
export const setAuthToken = async (token) => {
    await AsyncStorage.setItem('token', token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = async () => {
    await AsyncStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
};

export default apiClient;