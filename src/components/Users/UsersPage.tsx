import React, {FC} from "react";
import {useSelector} from "react-redux";
import Preloader from "../Common/Preloader/Preloader";
import {selectIsFetching} from "../../redux/users-selectors";
import {Users} from "./Users";

export const UsersPage: FC<PropsType> = (props) => {

    const isFetching = useSelector(selectIsFetching)

    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ?
            <Preloader/> : null
        }
        <Users/>
    </>
}

type PropsType = {
    pageTitle: string
}