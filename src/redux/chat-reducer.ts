import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {chatAPI, ChatMessageTypeAPI, StatusType} from "../api/chat-api"
import {Dispatch} from "redux"
import {v1} from "uuid";


const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {

        case 'CHAT/MESSAGE_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 20)
            }

        case 'CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }

        default:
            return state

    }

}

export const actions = {

    messagesReceived: (messages: ChatMessageTypeAPI[]) => ({
        type: 'CHAT/MESSAGE_RECEIVED',
        payload: {messages}
    } as const),

    statusChanged: (status: StatusType) => ({
        type: 'CHAT/STATUS_CHANGED',
        payload: {status}
    } as const)

}

let _newMessageHandler: ((messages: ChatMessageTypeAPI[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {

    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageTypeAPI[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {

    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {

    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

    chatAPI.start()
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {

    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))

    chatAPI.stop()
}

export const sendMessageTC = (message: string): ThunkType => async () => {

    chatAPI.sendMessage(message)
}


export default chatReducer;

type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
type ChatMessageType = ChatMessageTypeAPI & { id: string }
