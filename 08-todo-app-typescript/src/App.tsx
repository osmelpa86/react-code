import {Todos} from "./components/Todos.tsx";
import {Footer} from "./components/Footer.tsx";
import {Header} from "./components/Header.tsx";
import {useTodos} from "./hooks/useTodo.ts";
import {Copyright} from "./components/Copyright.tsx";

const App = () => {
    const {
        activeCount,
        completedCount,
        filterSelected,
        handleClearCompleted,
        handleCompleted,
        handleFilterChange,
        handleRemove,
        handleSave,
        handleUpdateTitle,
        todos: filteredTodos
    } = useTodos()

    return (
        <>
            <div className='todoapp'>
                <Header saveTodo={handleSave}/>
                <Todos
                    removeTodo={handleRemove}
                    setCompleted={handleCompleted}
                    setTitle={handleUpdateTitle}
                    todos={filteredTodos}
                />
                <Footer
                    handleFilterChange={handleFilterChange}
                    completedCount={completedCount}
                    activeCount={activeCount}
                    filterSelected={filterSelected}
                    onClearCompleted={handleClearCompleted}
                />
            </div>
            <Copyright/>
        </>
    )
}

export default App