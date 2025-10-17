import {Form} from "react-bootstrap";
import {AUTO_LANGUAGE, SUPPORTED_LANGUAGES} from "../constants.ts";
import type {Language, LanguageSelectorProps} from "../type.ts";

export const LanguageSelector = ({onChange, type, value}: LanguageSelectorProps) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);

        onChange(event.target.value as Language);
        console.log(event.target.value);
    }

    return (
        <Form.Select aria-label="Selecciona el idioma" onChange={handleOnChange} value={value}>
            {type === 'from' && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
            {
                Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                    <option key={key} value={key}>{literal}</option>
                ))
            }
        </Form.Select>
    )
}