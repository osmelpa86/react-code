import {useAppDispatch} from "./useStore.ts";
import {addNewUser, deleteUserById, type User, type UserId} from "../stores/users/slice.ts";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const addUser = ({name, email, github}: User) => {
        dispatch(addNewUser({name, email, github}))
    };
    
    const removeUser = (id: UserId) => {
        dispatch(deleteUserById(id))
    };


    return {
        addUser,
        removeUser
    };
};