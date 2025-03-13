import { createContext, useContext, useReducer } from "react";
import {saveDraft} from "../API_Callings/R1_API/Car";

//State
const initialState = {
    //Draft related
    draftId: null,
    //Tmp
    selectedWeek: null,
    //Real
    regNo: null,
    carDetails: {
        title: null,
        description: null,
        make: null,
        model: null,
        variant: null,
        city: null,
        mileage: null,
        fuel: null,
        color: null,
        engineSize: null,
        transmission: null,
        noOfOwners: null,
        horsePower: null,
        accidentHistory: null,
        condition: null,
    },
    features: {
        exterior: [],
    },
    images: {
        exterior: [],
        interior: [],
        wheels: [],
        tyreTreads: [],
    },
    carInspectionReport: {
        dynamicOperations: {
            breakEfficiency: null,
            handBrakeTest: null,
            staticGearSelection: null,
            reverseClutchSlip: null,
            steeringNoise: null,
            suspensionRideHeight: null,
            airconPower: null,
            satNavPower: null,
            icePower: null,
            centralLocking: null,
            convertibleSunroofElectrics: null,
            horn: null,
        },
        essentialChecks: {
            headLight: null,
            sideLight: null,
            brakeLight: null,
            fogLight: null,
            indicators: null,
            electricWindows: null,
            electricMirrors: null,
            wipers: null,
        },
        interiorChecks: {
            engineManagementLight: null,
            breakWearIndicatorLight: null,
            absWarningLight: null,
            oilWarningLight: null,
            airbagWarningLight: null,
            glowPlugLight: null,
        },
    },
    carDamageReport: {
        damageReport: [],
    },
    carPricing: {
        staringBidPrice: null,
        reserveBidPrice: null,
        buyNowPrice: null,
        duration: null,
    },
};
const carReducerFunction = (state, action) => {
    switch(action.type) {
        case 'SET_DRAFT': {
            return action.payload;
        }
        case 'RESET_STATE': {
            return initialState;
        }
        case 'DRAFT_ID': {
            return {
                ...state,
                draftId: action.payload,
            }
        }
        case 'UPDATE_IMAGE': {
            const images = {...state.images};
            images[action.section][action.index] = action.value;

            return {
                ...state,
                images,
            };
        }
        case 'UPDATE_FIELD': {
            if(action.section && action.subSection) {
                return {
                    ...state,
                    [action.section]: {
                        ...state[action.section],
                        [action.subSection]: {
                            ...state[action.section][action.subSection],
                            [action.field]: action.value,
                        }

                    }
                };
            }

            if(action.section) {
                return {
                    ...state,
                    [action.section]: {
                        ...state[action.section],
                        [action.field]: action.value,
                    }
                }
            }
            return {
                ...state,
                [action.field]: action.value,
            };
        }
    }
};

//Context
const CarContext = createContext({carState: initialState, dispatch: () => {}, draftSave: async (section) => {}, resetDraftState: () => {}});
export const useCar = () => useContext(CarContext);

export default function CarContextProvider({children}) {
    const [carState, dispatch] = useReducer(carReducerFunction, initialState);

    const draftSave = async (section, subSection) => {
        if(subSection) {
            const result = await saveDraft({
                [section]: {
                    [subSection]: carState[section][subSection],
                },
                draftId: carState.draftId,
                regNo: carState.regNo,
            });
            const resultData = result.data;
            dispatch({type: 'DRAFT_ID', payload: resultData.draftId});
        } else {
            const result = await saveDraft({
                [section]: carState[section],
                draftId: carState.draftId,
                regNo: carState.regNo,
            });
            const resultData = result.data;
            dispatch({type: 'DRAFT_ID', payload: resultData.draftId});
        }
    };

    const resetDraftState = () => {
        dispatch({type: 'RESET_STATE'});
    };

    return (
        <CarContext.Provider value={{carState, dispatch, draftSave, resetDraftState}}>
            {children}
        </CarContext.Provider>
    );
}