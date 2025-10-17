import type {FooterProps} from "../types/types";
import {Filters} from "./Filters.tsx";

export const Footer = ({
                           activeCount,
                           completedCount,
                           onClearCompleted,
                           filterSelected,
                           handleFilterChange
                       }: FooterProps) => {
    const singleActiveCount = activeCount === 1
    const activeTodoWord = singleActiveCount ? 'tarea' : 'tareas'

    return (
        <footer className="footer">

      <span className="todo-count">
        <strong>{activeCount}</strong> {activeTodoWord} pendiente{!singleActiveCount && 's'}
      </span>

            <Filters filterSelected={filterSelected} handleFilterChange={handleFilterChange}/>

            {
                completedCount > 0 && (
                    <button
                        className="clear-completed"
                        onClick={onClearCompleted}>
                        Borrar completados
                    </button>
                )
            }
        </footer>
    )
}