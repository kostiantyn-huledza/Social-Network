import {AppStateType} from "./redux-store";

export const selectDialogs = (state: AppStateType) => {
    return state.dialogsPage.dialogs
}

export const selectMessages = (state: AppStateType) => {
    return state.dialogsPage.messages
}