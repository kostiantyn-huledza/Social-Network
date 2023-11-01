import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

const initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

  const actions = {
    initializedSuccess: () => ({ type: "INITIALIZED_SUCCESS" } as const)
}

export const initializeAppTC = (): ThunkAction<void, AppStateType, unknown, ActionsType> => (dispatch: any) => {
    const promise = dispatch(getAuthUserData());
        promise.then( () => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer;

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>