import React, {FC} from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import AddNewPostForm, {AddPostType} from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/types";

const MyPosts: FC<PropsType & AddPostType> = (props) => {

    const postsElement = props.posts.map(p =>
        <Post message={p.message} likesCount={p.likesCount} key={p.id}/>
    )

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div className={s.posts}>{postsElement}</div>
            <AddNewPostForm addPost={props.addPost}/>
        </div>
    )
}

export default React.memo(MyPosts)

type PropsType = {
    posts: Array<PostType>
}

