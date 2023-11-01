import {useForm} from "react-hook-form";
import React, {FC} from "react";

const AddNewPostForm: FC<AddPostType> = (props) => {
    const {register, handleSubmit, reset} = useForm<FormDataType>();
    const onSubmit = (data: FormDataType) => {
        props.addPost(data.newPostText)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea {...register("newPostText", {required: true})} placeholder={"Post message"}/>
            </div>
            <div>
                <button>Add posts</button>
            </div>
        </form>
    )
}

export default AddNewPostForm

export type AddPostType = {
    addPost: (newPostText: string) => void
}
export type FormDataType = {
    newPostText: string
}