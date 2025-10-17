import {Form} from "react-bootstrap";
import {type TextAreaProps} from "../type.ts";
import {SectionType} from "../type.ts";

const commonStyles = {border: 0, height: '200px', risize: 'none'};

const getPlaceholder = (
    {type, loading}: { type: SectionType; loading?: boolean }
): string => {
    if (type === SectionType.From) return "Introducir texto";
    if (loading) return "Cargando...";
    return "Traducción";
};


export const TextArea = ({type, loading, value, onChange}: TextAreaProps) => {
    const styles = type === SectionType.From ? commonStyles : {...commonStyles, backgroundColor: '#f5f5f5'};
    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    }

    return (
        <Form.Control
            as="textarea"
            placeholder={getPlaceholder({type, loading})}
            disabled={type === SectionType.To && loading}
            style={styles}
            autoFocus={type === SectionType.From}
            value={value}
            onChange={handleOnChange}
        />
    )
}