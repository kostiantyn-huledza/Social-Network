import {AppStateType} from "./redux-store";

export const selectUsers = (state: AppStateType) => {
    return state.usersPage.users
}

export const selectPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const selectTotalUserCount = (state: AppStateType) => {
    return state.usersPage.totalUserCount
}

export const selectCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const selectIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const selectFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
export const selectUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}