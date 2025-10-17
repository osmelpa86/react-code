import {AUTO_LANGUAGE, type ENUM_ACTIONS, SUPPORTED_LANGUAGES} from "./constants.ts";

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;

export interface State {
    fromLanguage: FromLanguage;
    toLanguage: Language;
    frontText: string;
    result: string;
    loading: boolean;
}

export type Action =
    | { type: typeof ENUM_ACTIONS.INTERCHANGE_LANGUAGE }
    | { type: typeof ENUM_ACTIONS.SET_FROM_LANGUAGE, payload: FromLanguage }
    | { type: typeof ENUM_ACTIONS.SET_TO_LANGUAGE, payload: Language }
    | { type: typeof ENUM_ACTIONS.SET_FROM_TEXT, payload: string }
    | { type: typeof ENUM_ACTIONS.SET_RESULT, payload: string };

export type LanguageSelectorProps =
    | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const enum SectionType {
    From = 'from',
    To = 'to'
}

export interface TextAreaProps {
    type: SectionType,
    loading?: boolean | undefined,
    onChange: (value: string) => void,
    value: string
}