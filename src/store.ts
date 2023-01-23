import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ChatActionsType, chatReducer} from "./chat-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    chat:chatReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
export type AppActionTypes = ChatActionsType
export type AppThunkActionType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionTypes>
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store