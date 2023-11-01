import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export function WithAuthRedirect<Props extends MapStateToPropsType>(Component: React.ComponentType<Props>) {

    const RedirectComponent: React.FC<MapStateToPropsType> = (props) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to={"/login"}/>
        return <Component {...restProps as Props} />
    }
    return connect(mapStateToProps)(RedirectComponent);
}

type MapStateToPropsType = {
    isAuth: boolean
}

