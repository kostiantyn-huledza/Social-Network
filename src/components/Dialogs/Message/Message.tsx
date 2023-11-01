import style from './../Dialogs.module.css'
import {FC} from "react";

const Message: FC<PropsType> = (props) => {
    return <div className={style.message}>{props.message}</div>
}

export default Message;

type PropsType = {
    message: string
    id: number
}