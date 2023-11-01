import {AppStateType} from "./redux-store";

export const selectProfile = (state: AppStateType) => {
    return state.profilePage.profile
}
export const isAutSelect = (state: AppStateType) => {
    return state.profilePage.profile
}
export const authorizedUserIdSelect = (state: AppStateType) => {
    return state.auth.userId
}