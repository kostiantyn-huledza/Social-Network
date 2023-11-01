import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../types/types";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>
(mapStateToProps, {addPost: actions.addPost})(MyPosts)

export default MyPostsContainer;

type MapPropsType = {
    posts: Array<PostType>
}
type DispatchPropsType = {
    addPost: (newPostText: string) => void
}