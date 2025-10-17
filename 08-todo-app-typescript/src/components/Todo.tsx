import {useEffect, useRef, useState} from "react";
import type {TodoProps} from "../types/types";

export const Todo =
    ({
         id,
         title,
         completed,
         setCompleted,
         setTitle,
         removeTodo,
         isEditing,
         setIsEditing
     }: TodoProps) => {
        const [editedTitle, setEditedTitle] = useState(title)
        const inputEditTitle = useRef<HTMLInputElement>(null)

        const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
            if (e.key === 'Enter') {
                setEditedTitle(editedTitle.trim())

                if (editedTitle !== title) {
                    setTitle({id, title: editedTitle})
                }

                if (editedTitle === '') removeTodo(id)

                setIsEditing('')
            }

            if (e.key === 'Escape') {
                setEditedTitle(title)
                setIsEditing('')
            }
        }

        useEffect(() => {
            inputEditTitle.current?.focus()
        }, [isEditing])

        return (
            <>
                <div className='view'>
                    <input
                        className='toggle'
                        checked={completed}
                        type='checkbox'
                        onChange={(e) => {
                            setCompleted(id, e.target.checked)
                        }}
                    />
                    <label>{title}</label>
                    <button className='destroy' onClick={() => {
                        removeTodo(id)
                    }}></button>
                </div>

                <input
                    className='edit'
                    value={editedTitle}
                    onChange={(e) => {
                        setEditedTitle(e.target.value)
                    }}
                    onKeyDown={handleKeyDown}
                    onBlur={() => {
                        setIsEditing('')
                    }}
                    ref={inputEditTitle}
                />
            </>
        )
    };