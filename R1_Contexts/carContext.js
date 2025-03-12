import { createContext, useContext, useReducer } from "react";

//State
const initialState = {};
const carReducarFunction = (state, action) => {
    switch(action.type) {

    }
};

//Context
const CarContext = createContext();
export const useCar = () => useContext(CarContext);

export default function CarContextProvider({children}) {
    const [carState, dispatch] = useReducer(carReducarFunction, initialState);

    return (
        <CarContext.Provider value={{carState, dispatch}}>
            {children}
        </CarContext.Provider>
    );
}