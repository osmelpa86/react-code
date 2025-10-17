export const SUPPORTED_LANGUAGES = {
    en: 'English',
    es: 'Español',
    de: 'Deutsch'
} as const;

export const AUTO_LANGUAGE = 'auto' as const;

export const ENUM_ACTIONS = {
    INTERCHANGE_LANGUAGE: 'INTERCHANGE_LANGUAGE',
    SET_FROM_LANGUAGE: 'SET_FROM_LANGUAGE',
    SET_TO_LANGUAGE: 'SET_TO_LANGUAGE',
    SET_FROM_TEXT: 'SET_FROM_TEXT',
    SET_RESULT: 'SET_RESULT',
} as const;

export const VOICE_FOR_LANGUAGE = {
    en: 'en-GB',
    es: 'es-MX',
    de: 'de-DE'
}