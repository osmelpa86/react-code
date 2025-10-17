import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../stores";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;