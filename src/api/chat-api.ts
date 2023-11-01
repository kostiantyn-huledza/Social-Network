import {outputDateSeconds} from "../utils/object-helpers";

let ws: WebSocket | null = null

const  subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
}
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
    console.log('открылось соединение!', outputDateSeconds())
}
const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessage))
    console.log('получили массив данных с сервера!', outputDateSeconds())
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.log('Ошибка установить соединение!')
}
const closeHandler = () => {
    console.log('закрылось соединение!', outputDateSeconds())
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 2000)
}
const cleanUp = () => {
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('error', errorHandler)
    ws?.removeEventListener('close', closeHandler)
    console.log('удалили все подписки!', outputDateSeconds())
}

function createChannel() {
    notifySubscribersAboutStatus('pending')

    if (ws !== null) {
        setTimeout(() => {
            cleanUp()
            console.log('статус - ' + ws?.readyState, outputDateSeconds())
            ws?.close()
            console.log('статус - ' + ws?.readyState, outputDateSeconds())
        }, 500)
    }
    setTimeout(() => {
        console.log('статус - ' + ws?.readyState, outputDateSeconds())
        ws = new WebSocket(
            'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        ws.addEventListener('error', errorHandler)
        ws.addEventListener('open', openHandler)
        ws.addEventListener('message', messageHandler)
        ws.addEventListener('close', closeHandler)
    }, 1000)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp();
        ws?.close()
    },
    subscribe(eventName: EventsNamesType , callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)

        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },

    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
        createChannel()
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageTypeAPI[]) => void
type StatusChangedSubscriberType = (status : StatusType) => void
export type ChatMessageTypeAPI = {
    message: string
    photo: string
    userId: number
    userName: string
}
type EventsNamesType = 'messages-received' | 'status-changed'
export type StatusType = 'pending' | 'ready' | 'error'