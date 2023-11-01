import React, {ComponentType, FC, useEffect} from "react";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus,} from "../../redux/profile-reducer";
import {Navigate} from "react-router-dom";
import {compose} from "redux";
import Profile from "./Profile";
import {withRouter, WithRouterProps} from "../../hoc/withRouter";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";


const ProfileContainer: FC<PropsType> = (props) => {

    let userId: number | null = Number(props.router.params.userId)

    useEffect(() => {
        if (!userId)
            // eslint-disable-next-line react-hooks/exhaustive-deps
            userId = props.authorizedUserId;
        props.getUserProfile(userId as number);
        props.getStatus(userId as number);
    }, [getUserProfile, getStatus, userId])

    if (!props.isAuth && !props.router.params.userId) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <Profile {...props}
                     profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     isOwner={!props.router.params.userId}
                     savePhoto={props.savePhoto}
            />
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer)

type MapPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number
    isAuth: boolean
}
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<ProfileType>
}
type PropsType = MapPropsType & DispatchPropsType & WithRouterProps



