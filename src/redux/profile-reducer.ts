import {ResultCode} from "../api/api";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'My name is Mikhailo', likesCount: 20},
        {id: 3, message: 'Hey', likesCount: 1},
        {id: 4, message: 'Yo', likesCount: 10},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "ADD_POST":
            const newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 3
            }
            return {
                ...state,
                posts: [...state.posts, newPost]

            }
        case "SET_USER_PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SET_STATUS": {
            return {...state, status: action.status}
        }
        case "DELETE_POST": {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case "SAVE_PHOTO_SUCCESS": {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}

export const actions = {
    addPost: (newPostText: string) => ({type: "ADD_POST", newPostText}) as const,
    setUserProfile: (profile: ProfileType) => ({type: "SET_USER_PROFILE", profile} as const),
    setStatus: (status: string) => ({type: "SET_STATUS", status} as const),
    deletePost: (postId: number) => ({type: "DELETE_POST", postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: "SAVE_PHOTO_SUCCESS", photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === ResultCode.Success) {
        dispatch(actions.setStatus(status));
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCode.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === ResultCode.Success) {
        if (userId != null) {
            await dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    }
}

export default profileReducer;

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>