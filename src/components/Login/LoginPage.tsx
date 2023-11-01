import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import LoginForm from "./LoginForm";
import {FC} from "react";
import {AppDispatch, AppStateType} from "../../redux/redux-store";

export const LoginPage: FC = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const login = (email: string, password: string, rememberMe: boolean, setError: any, captcha: string) => {
        dispatch(loginTC(email, password, rememberMe, setError, captcha))
    }

    const dispatch: AppDispatch = useDispatch()

    if (isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return <div>
        <h1>AUTHORIZATION</h1>
        <LoginForm captchaUrl={captchaUrl}
                   login={login}
        />
    </div>
}

