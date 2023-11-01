import {ResultCode, ResultCodeForCaptcha} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
        case "GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: "SET_USER_DATA", payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: "GET_CAPTCHA_URL_SUCCESS", payload: {captchaUrl}
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.me();
    if (data.resultCode === ResultCode.Success) {
        let {id, login, email} = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}
export const loginTC = (email: string, password: string, rememberMe: boolean, setError: any,
                        captcha: string): ThunkType => async (dispatch) => {

    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCode.Success) {
        await dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }
        setError("server", {
            type: "custom",
            message: data.messages
        })
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}
export const logoutTC = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout();
    if (data.resultCode === ResultCode.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer;

type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
