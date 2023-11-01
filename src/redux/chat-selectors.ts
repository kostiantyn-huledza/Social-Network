import {AppStateType} from "./redux-store";

export const selectStatus = (state: AppStateType) => {
    return state.chat.status
}
export const selectMessages = (state: AppStateType) => {
    return state.chat.messages
}