import type {User, QueryKey, FetchUsersResult} from "../types.ts";
import type {QueryFunctionContext} from "@tanstack/react-query";


export const fetchUsers = async ({
                              pageParam = 1,
                              signal,
                          }: QueryFunctionContext<QueryKey, number>): Promise<FetchUsersResult> => {
    const res = await fetch(`https://randomuser.me/api/?results=10&page=${pageParam}`, {signal});
    if (!res.ok) throw new Error('Error al obtener los usuarios');
    const json = await res.json();
    const currentPage = Number(json.info.page);
    const nextCursor = currentPage > 3 ? undefined : currentPage + 1; //Para darle un tope a la cantidad de paginas
    return {
        users: json.results as User[],
        nextCursor
    };
};