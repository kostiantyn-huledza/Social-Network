import {instance} from "./api";

export const securityAPI = {

    getCaptchaUrl() {
        return instance.get<getCaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}

export type getCaptchaUrlResponseType = {
    url: string
}