import style from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {FC} from "react";

const DialogItem: FC<PropsType> = (props) => {
    const path = '/dialogs/' + props.id;

    return (
        <div className={style.dialog + ' ' + style.active}>
            <img src={props.avatar} alt=''/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem

type PropsType = {
    id: number
    avatar: string
    name: string
}