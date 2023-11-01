import style from "./ProfileInfo.module.css";
import {FC} from "react";
import {ContactsType, ProfileType} from "../../../types/types";
import {Button} from "antd";

const ProfileData: FC<PropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <>
            {isOwner && <div><Button onClick={goToEditMode}>Edit profile</Button></div>}
            <div>
                <div>
                    <b>Full name</b>: {profile.fullName}
                </div>
                <div>
                    <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
                </div>
                {profile.lookingForAJob &&
                    <div>
                        <b>My professional skills</b>: {profile.lookingForAJobDescription}
                    </div>
                }
                <div>
                    <b>About me</b>: {profile.aboutMe}
                </div>
                <div>
                    <b>Contacts</b>: {
                    Object
                        .keys(profile.contacts)
                        .map(key => {
                            return <Contact key={key} contactTitle={key}
                                            contactValue={profile.contacts[key as keyof ContactsType]}/>
                        })}
                </div>
            </div>
        </>
    )
}

const Contact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={style.contact}><b>{contactTitle}</b> : {contactValue}</div>
}

export default ProfileData

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}