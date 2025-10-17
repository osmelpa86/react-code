import {type Action, type FromLanguage, type Language, type State} from "../type.ts";
import {useReducer} from "react";
import {AUTO_LANGUAGE, ENUM_ACTIONS} from "../constants.ts";

//1 Crear estado inicial
const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    frontText: '',
    result: '',
    loading: false,
}

//2. Crear el reducer
function reducer(state: State, action: Action): State {
    const {type} = action;

    if (type === ENUM_ACTIONS.INTERCHANGE_LANGUAGE) {
        // Evitar intercambio si el idioma origen es AUTO_LANGUAGE
        if (state.fromLanguage === AUTO_LANGUAGE) return state;

        const loading = state.frontText !== '';

        return {
            ...state,
            loading,
            result: '',
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage as Language,
        };
    }

    if (type === ENUM_ACTIONS.SET_FROM_LANGUAGE) {
        if (state.fromLanguage === action.payload) return state;

        const loading = state.frontText !== '';

        return {
            ...state,
            fromLanguage: action.payload,
            result: '',
            loading
        };
    }

    if (type === ENUM_ACTIONS.SET_TO_LANGUAGE) {
        if (state.toLanguage === action.payload) return state;

        const loading = state.frontText !== '';
        return {
            ...state,
            toLanguage: action.payload,
            result: '',
            loading,
        };
    }

    if (type === ENUM_ACTIONS.SET_FROM_TEXT) {
        const loading = action.payload !== '';
        return {
            ...state,
            loading,
            frontText: action.payload,
        };
    }

    if (type === ENUM_ACTIONS.SET_RESULT) {
        return {
            ...state,
            loading: false,
            result: action.payload,
        };
    }

    return state;
}

export const useStore = () => {
    //3. Usar el hooks useReducer
    const [{
        fromLanguage,
        toLanguage,
        frontText,
        result,
        loading
    }, dispatch] = useReducer(reducer, initialState);


    const interchangeLanguage = () => {
        dispatch({type: ENUM_ACTIONS.INTERCHANGE_LANGUAGE})
    }

    const setFromLanguage = (payload: FromLanguage) => {
        dispatch({type: ENUM_ACTIONS.SET_FROM_LANGUAGE, payload});
    }

    const setToLanguage = (payload: Language) => {
        dispatch({type: ENUM_ACTIONS.SET_TO_LANGUAGE, payload});
    }

    const setFrontText = (payload: string) => {
        dispatch({type: ENUM_ACTIONS.SET_FROM_TEXT, payload});
    }

    const setResult = (payload: string) => {
        dispatch({type: ENUM_ACTIONS.SET_RESULT, payload});
    }

    return {
        fromLanguage,
        toLanguage,
        frontText,
        result,
        loading,
        interchangeLanguage,
        setFromLanguage,
        setToLanguage,
        setFrontText,
        setResult
    }
}