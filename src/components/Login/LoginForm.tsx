import {useForm} from "react-hook-form";
import style from "./Login.module.css"
import {FC} from "react";


const LoginForm: FC<PropsType> = ({login, captchaUrl}) => {

    const {register, formState: {errors, isValid}, handleSubmit, clearErrors, setError, reset} = useForm<FormDataType>({
        mode: "onBlur"
    });

    const onSubmit = (data: FormDataType) => {
        login(data.email, data.password, data.rememberMe, setError, data.captcha);
        reset({
                email: "",
                password: "",
                rememberMe: false
            },
            {keepErrors: true}
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email:
                <br/>
                <input type="text" {...register("email", {
                    required: "This field is required.",
                    minLength: {value: 5, message: "Your login must be at least 5 symbols long."},
                })}
                       onFocus={() => clearErrors(["email", "server"])} placeholder="Email"/>
            </label>
            <br/>
            <div className={style.errorMessage}>{errors.email && <span>{"Error!"}</span>}</div>
            <label>Password:
                <br/>
                <input type="password" {...register("password", {required: "This field is required."})}
                       onFocus={() => clearErrors(["password", "server"])} placeholder="Password"/>
            </label>
            <br/>
            <div className={style.errorMessage}>{errors.password && <span>{"Error!"}</span>}
            </div>
            <label>
                <input type="checkbox" {...register("rememberMe")}/> Remember me
            </label>
            <br/>
            {captchaUrl && <div><img src={captchaUrl} alt="text"/></div>}
            {captchaUrl && <input {...register("captcha", {required: "This field is required."})} />}
            {errors.server && <div className={style.errorMessage}><span>{"Error!"}</span></div>}
            <input type="submit" disabled={!isValid} value="Log in"/>
        </form>
    )
}

export default LoginForm

type PropsType = {
    login: (email: string, password: string, rememberMe: boolean, setError: any, captcha: string) => void
    captchaUrl: string | null
}
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    setError: any
    captcha: string
    server: string
}