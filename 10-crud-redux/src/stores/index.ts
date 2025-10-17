import {type Middleware, configureStore, type Dispatch, type MiddlewareAPI, type UnknownAction} from '@reduxjs/toolkit';
import usersReducer, {roolbackUser} from './users/slice';
import {toast} from "sonner";

type UsersState = ReturnType<typeof usersReducer>;
export type RootState = { users: UsersState };

const persistanceLocalStorageMiddleware: Middleware<RootState> =
    (store) => (next) => (action) => {
        next(action);
        localStorage.setItem('__redux__state__', JSON.stringify(store.getState()));
    };

const syncWithDatabase: Middleware<Record<string, never>, RootState> =
    (store: MiddlewareAPI<Dispatch, RootState>) =>
        (next) =>
            (action: unknown) => {
                // casteamos para poder desestructurar
                const {type, payload} = action as UnknownAction;
                const previoState = store.getState();

                next(action);

                if (type === 'users/deleteUserById') {
                    const userToRemove = previoState.users.find(user => user.id === payload);

                    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
                        method: 'DELETE',
                    }).then(res => {
                        if (res.ok) {
                            toast.success('Usuario eliminado');
                        }
                        throw new Error('Error al eliminar el usuario');
                    }).catch(err => {
                        toast.error('Error al eliminar el usuario');
                        if (userToRemove) store.dispatch(roolbackUser(userToRemove));
                        console.error(err);

                    });
                }
            };


export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    // usar la forma funcional para mantener middlewares por defecto (thunk, etc.)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistanceLocalStorageMiddleware).concat(syncWithDatabase),
});

// Tipos útiles para el proyecto
export type AppDispatch = typeof store.dispatch;