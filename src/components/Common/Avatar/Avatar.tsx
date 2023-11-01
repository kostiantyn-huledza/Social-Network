import React, {FC} from "react";
import s from './Avatar.module.css'
import avatar from "../../../assets/images/avatar.jpg"

export const Avatar: FC<PropsType> = () => {
    return <img className={s.avatar} src={avatar} alt={''}/>
}

export default Avatar;

type PropsType = {}