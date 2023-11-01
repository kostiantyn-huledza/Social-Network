import React, {ChangeEvent, FC, useEffect, useRef, useState} from "react"
import {Button} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch} from "../../redux/redux-store"
import {sendMessageTC, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer"
import {selectMessages, selectStatus} from "../../redux/chat-selectors"
import {outputDateSeconds} from "../../utils/object-helpers";


const ChatPage: FC = () => {

    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const status = useSelector(selectStatus)

    useEffect(() => {
        console.log('старт', outputDateSeconds())
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    return (
        <div>
            {status === "error" && < div > Some error occurred. Please refresh the page</div>}
                <>
                <Messages/>
                <AddMessageForm/>
                </>
        </div>
    )
}

const Messages: FC = () => {
    console.log('>>>Messages')

    const messages = useSelector(selectMessages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {

        const element = e.currentTarget

        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            //element.scrollHeight - высота всей таблицы пикселей - 3800 например
            // element.scrollTop - сколько сейчас в
            // верхней точке длинна пикселей - 3400 например
            // прокрутка вверх то тут уже 3300 и разница уже 500 пикселей
            // element.clientHeight - всегда как у див тоесть = 400
            // 500 - 400 = 100
            console.log('Включили автоскролл')
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
            console.log('Выключили автоскролл')
        }
    }

    useEffect(() => {

        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})

    }, [messages])

    return (
        <div style={{height: 400, overflowY: "auto"}} onScroll={scrollHandler}>
            {messages.map((m) => <Message message={m} key={m.id}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: FC<{ message: ChatMessageType }> = React.memo(({message}) => {

    console.log('>>>>>message')

    return (
        <div>
            <img style={{width: '30px'}} src={message.photo} alt={message.userName}/><b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})

const AddMessageForm: FC = () => {

    const [message, setMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector(selectStatus)

    const sendMessageHandler = () => {

        if (!message) {
            return
        }
        dispatch(sendMessageTC(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)}
                          value={message}></textarea>
            </div>
            <div>
                <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>
    )
}

export default ChatPage

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}