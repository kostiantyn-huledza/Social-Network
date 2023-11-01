import {useForm} from "react-hook-form";
import style from "./ProfileInfo.module.css";
import {Dispatch, FC, SetStateAction} from "react";
import {ContactsType, ProfileType} from "../../../types/types";

const ProfileDataForm: FC<PropsType> = ({profile, saveProfile, setEditMode}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
        watch
    } = useForm<ProfileType>({values: profile});

    const onSubmit = async (data: ProfileType) => {
        await saveProfile(data)
        setEditMode(false);
        reset({
            contacts: {}
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <button type="submit" disabled={!isValid}>Save</button>
            </div>
            <div>
                <b>Full name:</b>
                <input {...register("fullName", {required: true})} placeholder="Full name"/>
                {errors.fullName && <div className={style.errors}>This field is required</div>}
            </div>
            <div>
                <b>Looking for a job:</b>
                <input type="checkbox" {...register("lookingForAJob")} checked={watch('lookingForAJob')}/>
            </div>
            <div>
                <b>My professional skills:</b> <textarea
                {...register("lookingForAJobDescription", {required: true})}
                placeholder="Description"/>
                {errors.lookingForAJobDescription && <div className={style.errors}>This field is required</div>}
            </div>
            <div>
                <b>About me:</b>
                <textarea
                    {...register("aboutMe", {required: true})} placeholder="About me"/>
                {errors.aboutMe && <div className={style.errors}>This field is required</div>}
            </div>
            <div>

                <b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
                return <div className={style.contact} key={key}>
                    <b>{key}:</b>
                    <input {...register(`contacts.${key as keyof ContactsType}`, {required: true})}
                           placeholder={key}/>
                    {errors.contacts && (
                        <div className={style.errors}>This field is required</div>
                    )}
                </div>
            })}
            </div>
        </form>
    )
}

export default ProfileDataForm;

type PropsType = {
    profile: ProfileType
    saveProfile: (profile: ProfileType) => Promise<ProfileType>
    setEditMode: Dispatch<SetStateAction<boolean>>

}