import React, {FC} from "react";
import {useForm} from "react-hook-form";
import {AppDispatch} from "../../redux/redux-store";
import {useDispatch} from "react-redux";
import {actions} from "../../redux/dialogs-reducer";


const AddMessageForm: FC = () => {
    const {register, handleSubmit, reset} = useForm<NewMessageFormType>();
    const dispatch: AppDispatch = useDispatch()

    const sendMessage = (messageText: string) => {
        dispatch(actions.sendMessageAC(messageText))
    }

    const onSubmit = (data: NewMessageFormType) => {
        sendMessage(data.newMessageBody)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea {...register("newMessageBody", {required: true})} placeholder='Enter your message'/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default AddMessageForm;

type NewMessageFormType = {
    newMessageBody: string
}


