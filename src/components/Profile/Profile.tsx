import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {FC} from "react";
import {ProfileType} from "../../types/types";

const Profile: FC<ProfilePropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                isOwner={isOwner}
                savePhoto={savePhoto}
                saveProfile={saveProfile}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;

export type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<ProfileType>
}