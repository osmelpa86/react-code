import './App.css'
import {useMemo, useState} from "react";
import {SortBy, type User} from "./types.ts";
import {UsersList} from "./components/UsersList.tsx";
import {useUsers} from "./hooks/useUsers.ts";


function App() {
    const {
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        reset,
        users,
        deleteUser
    } = useUsers();

    // Ahora TypeScript sabe que `data.pages` existe


    const [showColors, setShowColors] = useState<boolean>(false);
    const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
    const [filterCountry, setFilterCountry] = useState<string | null>(null);

    const toggleColors = () => {
        setShowColors(!showColors);
    }

    //Otra forma de hacerlo para cambiar el valor del estado si dependemos del valor anterior, no como el casdo de toggleColor que no se neceista depender del estado anterior
    const toggleSortByCountry = () => {
        const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
        setSorting(newSortingValue);
    }

    const filteredUsers = useMemo(() => {
        return typeof filterCountry === 'string' && filterCountry?.length > 0 ? users.filter((user) => {
            return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
        }) : users
    }, [users, filterCountry]);

    const sortedUsers = useMemo(() => {
        if (sorting === SortBy.NONE) return filteredUsers;

        const compareProperties: Record<string, (user: User) => string> = {
            [SortBy.COUNTRY]: users => users.location.country,
            [SortBy.NAME]: users => users.name.first,
            [SortBy.LAST]: users => users.name.last,
        }

        return filteredUsers.toSorted((a, b) => {
            const extractProperty = compareProperties[sorting];
            return extractProperty(a).localeCompare(extractProperty(b));
        });
    }, [filteredUsers, sorting]);

    const handleDelete = (email: string) => {
        deleteUser(email);
    }

    const handleReset = async () => {
        await reset()
    }

    const handleChangeSort = (sort: SortBy) => {
        return setSorting(sort);
    }

    return (
        <div className="App">
            <h2>Prueba Técnica React + Typescript</h2>
            <header style={{display: 'flex', gap: '10px'}}>
                <button onClick={toggleColors}>
                    {showColors ? 'Ocultar colores' : 'Mostrar colores'}
                </button>
                <button onClick={toggleSortByCountry}>
                    {sorting === SortBy.COUNTRY ? 'No ordenar' : 'Ordenar por pais'}
                </button>
                <button onClick={handleReset}>
                    Resetear estado
                </button>

                <input placeholder="Filtra por país" onChange={(e) => setFilterCountry(e.target.value)}/>
            </header>
            <main>
                {<UsersList users={sortedUsers} showColors={showColors} deleteUser={handleDelete}
                            changeSorting={handleChangeSort}/>}
                {isLoading && <p>Cargando...</p>}
                {isError && <p>Ha habido un error</p>}
                {!isError && users.length === 0 && <p>No hay usuarios</p>}
                {!isLoading && !isError && hasNextPage &&
                    <button onClick={() => fetchNextPage()}>Cargar más resultados</button>}
                {!isLoading && !isError && !hasNextPage && <p>No hay mas resultados</p>}
            </main>
        </div>
    )
}

export default App