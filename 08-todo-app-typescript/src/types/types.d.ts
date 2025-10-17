import type {TODO_FILTERS} from "../consts.ts";

export type TodoType = {
    id: string
    title: string
    completed: boolean
}

export type TodoList = TodoType[]

export interface TodoProps {
    id: string
    title: string
    completed: boolean
    setCompleted: (id: string, completed: boolean) => void
    setTitle: (params: { id: string, title: string }) => void
    isEditing: string
    setIsEditing: (completed: string) => void
    removeTodo: (id: string) => void
}

export interface TodosProps {
    todos: TodoType[]
    setCompleted: (id: string, completed: boolean) => void
    setTitle: (params: Omit<TodoType, 'completed'>) => void
    removeTodo: (id: string) => void
}

export interface FooterProps {
    handleFilterChange: (filter: FilterValue) => void
    activeCount: number
    completedCount: number
    onClearCompleted: () => void
    filterSelected: FilterValue
}

export type FilterValue = typeof TODO_FILTERS [keyof typeof TODO_FILTERS]

export interface FilterProps {
    handleFilterChange: (filter: FilterValue) => void
    filterSelected: typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
}

export interface HeaderProps {
    saveTodo: (title: string) => void
}

export interface CreateTodoProps {
    saveTodo: (title: string) => void
}