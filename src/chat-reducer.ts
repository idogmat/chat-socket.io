import {API} from "./api";
import {AppThunkActionType} from "./store";

export type IUser={
    userId: string
    userName: string
    message: string
    photo: string
}

const initialState = {
    messages:[] as IUser[]
}
export type ChatActionsType = ReturnType<typeof messagesReceived>| ReturnType<typeof newMessagesReceived>

export const chatReducer = (state = initialState, action: ChatActionsType) => {
    switch (action.type) {
        case "message-received":
            return {...state, messages: action.messages}
        case "new-messages-received":
            return {...state, messages: [...state.messages, action.messages]}
        default:
            return state
    }
}
const messagesReceived = (messages: any) => ({type: "message-received", messages})
const newMessagesReceived = (messages: any) => ({type: "new-messages-received", messages})

export const createConnection = ():AppThunkActionType =>  (dispatch) => {
    API.createConnection()
    API.subscribe((messages: any) => {
        dispatch(messagesReceived(messages))
    }, (messages: any) => {
        dispatch(newMessagesReceived(messages))
    })
}
export const setClientName = (name:string):AppThunkActionType =>  (dispatch) => {
    API.sendName(name)
}
export const sendMessage = (message:string):AppThunkActionType =>  (dispatch) => {
    API.sendMessage(message)
}
export const destroyConnection = ():AppThunkActionType =>  (dispatch) => {
    API.destroyConnection()
}