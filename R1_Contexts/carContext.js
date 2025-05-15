import { createContext, useContext, useReducer } from "react";
import {postAd, saveDraft} from "../API_Callings/R1_API/Car";

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
        model: 2020,
        variant: null,
        location: null,
        mileage: null,
        fuel: null,
        color: null,
        engineSize: null,
        transmission: null,
        noOfOwners: 1,
        horsePower: null,
        accidentHistory: null,
        condition: null,
    },
    features: {
        exterior: [],
        interior: [],
    },
    images: {
        exterior: null,
        interior: null,
        wheels: null,
        tyreTreads: null,
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
        case 'INSERT_DAMAGE': {
            if(!state.carDamageReport) {
                return {
                    ...state,
                    carDamageReport: {
                        damageReport: [
                            action.value,
                        ],
                    }
                }
            }

            return {
                ...state,
                carDamageReport: {
                    damageReport: [
                        ...state.carDamageReport.damageReport,
                        action.value,
                    ],
                }
            }
        }
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
            if(images[action.section]) {
                images[action.section][action.index] = action.value;
            } else {
                images[action.section] = [];
                images[action.section][action.index] = action.value;
            }

            return {
                ...state,
                images,
            };
        }
        case 'REMOVE_FEATURE': {
            const filtered = state?.features[action?.section].filter(val => val !== action.value);
            return {
                ...state,
                features: {
                    ...state.features,
                    [action.section]: filtered,
                },
            }
        }
        case 'UPDATE_FEATURE': {
            if(state.features && state.features[action.section]) {
                return {
                    ...state,
                    features: {
                        ...state.features,
                        [action.section]: [
                            ...state.features[action.section],
                            action.value,
                        ],
                    },
                };
            }

            return {
                ...state,
                features: {
                    ...state.features,
                    [action.section]: [
                        action.value,
                    ],
                },
            };

            
        }
        case 'UPDATE_FIELD': {
            if (action.section && action.subSection) {
                return {
                    ...state,
                    [action.section]: {
                        ...state[action.section],
                        [action.subSection]: {
                            ...((state[action.section] && state[action.section][action.subSection]) || {}),
                            [action.field]: action.value,
                        },
                    },
                };
            }
        
            if (action.section) {
                return {
                    ...state,
                    [action.section]: {
                        ...(state[action.section] || {}),
                        [action.field]: action.value,
                    },
                };
            }
        
            return {
                ...state,
                [action.field]: action.value,
            };
        }
    }
};

//Context
const CarContext = createContext({carState: initialState, dispatch: () => {}, draftSave: async (section) => {}, resetDraftState: () => {}, carPostAd: async () => {}});
export const useCar = () => useContext(CarContext);

export default function CarContextProvider({children}) {
    const [carState, dispatch] = useReducer(carReducerFunction, initialState);

    const draftSave = async (section, subSection) => {
        if(subSection) {
            const cleanedSubSection = {};
            for(const sub in carState[section]) {
                if(carState[section][sub] && carState[section][sub].length > 0) {
                    cleanedSubSection[sub] = carState[section][sub];
                }
            }

            if(Object.keys(cleanedSubSection).length === 0) {
                throw {
                    name: 'app',
                    message: 'No info to save',
                };
            }
            
            const result = await saveDraft({
                [section]: {
                    ...cleanedSubSection,
                    // [subSection]: carState[section][subSection],
                },
                draftId: carState.draftId,
                regNo: carState.regNo,
            });

            const resultData = result.data;
            dispatch({type: 'DRAFT_ID', payload: resultData.draftId});
        } else {
            const body = {
                draftId: carState.draftId,
                regNo: carState.regNo,
            }
            if(section === 'carDamageReport' && carState[section]) {
                if(carState[section].damageReport.length > 0) {
                    body[section] = carState[section];
                } else {
                    dispatch({type: 'SET_DRAFT', payload: {
                        ...carState,
                        carDamageReport: null,
                    }})
                }
            } else if(carState[section]) {
                body[section] = carState[section];
            }
            
            if(!body[section] && section !== 'carDamageReport') {
                throw {
                    name: 'app',
                    message: 'No info to save',
                }
            }

            const result = await saveDraft(body);
            const resultData = result.data;
            dispatch({type: 'DRAFT_ID', payload: resultData.draftId});
        }
    };

    const resetDraftState = () => {
        dispatch({type: 'RESET_STATE'});
    };

    const carPostAd = async () => {
        await postAd(carState.draftId);
        resetDraftState();
    };

    return (
        <CarContext.Provider value={{carState, dispatch, draftSave, resetDraftState, carPostAd}}>
            {children}
        </CarContext.Provider>
    );
}