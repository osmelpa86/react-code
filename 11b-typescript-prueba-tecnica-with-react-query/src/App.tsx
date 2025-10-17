import './App.css'
import {useEffect, useMemo, useRef, useState} from "react";
import {SortBy, type User} from "./types.ts";
import {UsersList} from "./components/UsersList.tsx";

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [showColors, setShowColors] = useState<boolean>(false);
    const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
    const [filterCountry, setFilterCountry] = useState<string | null>(null);
    /*useRef-> para guardar un valor que queremos que se comporta entre renderizados,
    pero que al cambiar no vuelva a renderizar el componente*/
    const originalUsers = useRef<User[]>([]);

    useEffect(() => {
        fetch(`https://randomuser.me/api/?results=10`, {
            method: 'GET'
        }).then(res => res.json()).then(
            res => {
                setUsers(res.results)
                originalUsers.current = res.results
            }
        ).catch(err => console.log(err));
    }, []);

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
        const filteredUsers = users.filter((user) => user.email !== email);
        setUsers(filteredUsers);

    }

    const handleReset = () => {
        setUsers(originalUsers.current);
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
                <UsersList users={sortedUsers} showColors={showColors} deleteUser={handleDelete}
                           changeSorting={handleChangeSort}/>
            </main>
        </div>
    )
}

export default App