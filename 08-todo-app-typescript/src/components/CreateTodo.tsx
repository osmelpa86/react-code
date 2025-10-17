import type {CreateTodoProps} from "../types/types";
import {useState} from "react";

export const CreateTodo = ({saveTodo}: CreateTodoProps) => {
    const [inputValue, setInputValue] = useState('')

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter' && inputValue !== '') {
            saveTodo(inputValue)
            setInputValue('')
        }
    }

    return (
        <input
            className='new-todo'
            value={inputValue}
            onChange={(e) => {
                setInputValue(e.target.value)
            }}
            onKeyDown={handleKeyDown}
            placeholder='¿Qué quieres hacer?'
            autoFocus
        />
    )
}