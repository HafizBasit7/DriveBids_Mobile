import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useReducer } from "react";
import apiClient, { setAuthToken } from "../API_Callings/R1_API/axios-client";
import { getUser, loginUser, signupUser } from "../API_Callings/R1_API/Auth";


//State
const intialState = {isLoading: true, isAuthenticated: false, user: null, isFirstTime: true};
const authReducerFunction = (state, action) => {
    switch(action.type) {
        case 'toggleLoading': {
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        }
        case 'setIsFirstTime': {
            return {
                ...state,
                isFirstTime: action.value,
            }
        }
        case 'setUser': {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            }
        }
        default: {
            return state;
        }
    }
};

//Context
const AuthContext = createContext({authState: intialState, onboardingComplete: () => {}, login: async (payload) => {}, signup: async (payload) => {}});
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider ({children}) {

    const [authState, dispatch] = useReducer(authReducerFunction, intialState);

    //First Time Load
    useEffect(() => {
        if(authState.isLoading) {
            initialLoad();
        }
    }, []);


    //Initial
    const loadUser = async (token) => {
        await setAuthToken(token);
        const user = await getUser(); 
        dispatch({type: 'setUser', payload: user.data}); 
    };

    //Login
    const login = async (payload) => {
        const user = await loginUser(payload);
        const userData = user.data;

        await setAuthToken(userData.token);
        dispatch({type: 'setUser', payload: userData.user});
    };

    //Signup
    const signup = async (payload) => {
        const user = await signupUser(payload);
        console.log('Signup successfull: ', user);
    };

    //Initially Load user
    const initialLoad = async () => {
        //Load isFirstTime value
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        dispatch({type: 'setIsFirstTime', value: isFirstTime ? false : true});

        const token = await AsyncStorage.getItem('token');
        if(token) {
            await loadUser(token);
        }

        //Toggle Loading
        dispatch({type: 'toggleLoading'});
    };

    //On boarding complete
    const onboardingComplete = async () => {
        dispatch({type: 'setIsFirstTime', value: false});
        await AsyncStorage.setItem('isFirstTime', 'true');
    };

    return (
        <AuthContext.Provider value={{authState, onboardingComplete, login, signup}}>
            {children}
        </AuthContext.Provider>
    )
}