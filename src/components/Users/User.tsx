import React, {FC} from "react";
import styles from './users.module.css';
import userPhoto from "../../assets/images/user.png"
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

const User: FC<PropsType> = (props) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + props.user.id }>
                        <img src={props.user.photos.small != null
                            ? props.user.photos.small
                            : userPhoto}
                             className={styles.userPhoto} alt=""/>
                    </NavLink>
                </div>
                <div>
                    {props.user.followed ?
                        <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                onClick={() => {
                                    props.unfollow(props.user.id);
                                }}>Unfollow</button> :
                        <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                onClick={() => {
                                    props.follow(props.user.id);
                                }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{props.user.name}</div>
                    <div>{props.user.status}</div>
                </span>
                <span>
                    <div>{"props.user.location.country"}</div>
                    <div>{"props.user.location.city"}</div>
                </span>
            </span>
        </div>
    )
}

export default User;

type PropsType = {
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    user: UserType
}