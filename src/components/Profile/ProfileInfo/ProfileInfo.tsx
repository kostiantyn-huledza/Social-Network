import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../assets/images/user.png"
import {FC, SyntheticEvent, useState} from "react";
import ProfileDataForm from "./ProfileDataForm";
import ProfileData from "./ProfileData";
import {ProfilePropsType} from "../Profile";

const ProfileInfo: FC<ProfilePropsType> = ({profile, status, isOwner, savePhoto, updateStatus, saveProfile}) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: SyntheticEvent<EventTarget>) => {

        if ((e.target as HTMLFormElement).files.length) {
            savePhoto((e.target as HTMLFormElement).files[0]);
        }
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt=''/>
                {isOwner &&
                    <div className={s.file}>
                        <input type={"file"} onChange={onMainPhotoSelected}/>
                    </div>}
                {editMode
                    ? <ProfileDataForm setEditMode={setEditMode} profile={profile} saveProfile={saveProfile}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>}
                <ProfileStatus status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;