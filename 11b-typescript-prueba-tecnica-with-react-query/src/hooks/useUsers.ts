import {type InfiniteData, type QueryFunctionContext, useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import type {FetchUsersResult, QueryKey, User} from "../types.ts";
import {fetchUsers} from "../services/users.ts";

export const useUsers = () => {
    const queryClient = useQueryClient();
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<
        FetchUsersResult,                      // TQueryFnData (cada página)
        Error,                                 // TError
        InfiniteData<FetchUsersResult>,        // TData  -> IMPORTANTÍSIMO: el aggregated data con .pages
        QueryKey,                              // TQueryKey
        number                                 // TPageParam
    >({
        queryKey: ['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 3
    });

    const users: User[] = data?.pages?.flatMap(page => page.users) ?? [];

    /**
     * reset(): trae la página 1 desde la API y sobrescribe la cache
     * para que la UI quede "como al inicio" (solo la 1ra página).
     */
    const reset = async () => {
        try {
            // Llamamos fetchUsers manualmente para obtener la primera página (fresca)
            // El fetchUsers espera QueryFunctionContext, casteamos a any para llamar directo.
            const firstPage = await fetchUsers({pageParam: 1} as QueryFunctionContext<QueryKey, number>);

            // Sobreescribimos la cache de useInfiniteQuery con solo la primera página
            queryClient.setQueryData(
                ['users'],
                {
                    pages: [firstPage],
                    pageParams: [1],
                }
            );
        } catch (err) {
            // Si falla el fetch, hacemos un fallback truncando la cache local
            console.error('Error al resetear users a página 1', err);
            queryClient.setQueryData<InfiniteData<FetchUsersResult>>(
                ['users'],
                (old) => {
                    if (!old) return old;
                    return {
                        pages: [old.pages[0]],
                        pageParams: [old.pageParams?.[0] ?? 1],
                    };
                }
            );
        }
    };

    /**
     * deleteUser(email): elimina el usuario identificado por email de la cache
     * - Filtra cada página y elimina páginas vacías
     * - Conserva pageParams coherentes
     */
    const deleteUser = (email: string) => {
        queryClient.setQueryData<InfiniteData<FetchUsersResult>>(
            ['users'],
            (old) => {
                if (!old) return old;

                // 1) filtrar usuarios por página
                const filteredPages = old.pages
                    .map(page => ({ ...page, users: page.users.filter(u => u.email !== email) }))
                    .filter(page => page.users.length > 0); // quitar páginas vacías

                // 2) si no quedan páginas, devolver estructura vacía
                if (filteredPages.length === 0) {
                    return {
                        pages: [],
                        pageParams: []
                    } as InfiniteData<FetchUsersResult>;
                }

                // 3) conservar pageParams (truncar si hicimos pop de páginas)
                const newPageParams = (old.pageParams ?? []).slice(0, filteredPages.length);
                // si no existían pageParams, generar índices 1..n (fallback)
                const finalPageParams = newPageParams.length ? newPageParams : filteredPages.map((_, i) => i + 1);

                return {
                    pages: filteredPages,
                    pageParams: finalPageParams
                } as InfiniteData<FetchUsersResult>;
            }
        );
    };

    return {
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        reset,
        users,
        deleteUser
    }
}