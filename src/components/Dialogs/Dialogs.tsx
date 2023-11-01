import React, {FC} from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import AddMessageForm from "./DialogsForm";
import {useSelector} from "react-redux";
import {selectDialogs, selectMessages} from "../../redux/dialogs-selectors";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";

const Dialogs: FC = () => {
    const dialogs = useSelector(selectDialogs)
    const messages = useSelector(selectMessages)

    const dialogsElements = dialogs.map(d => <DialogItem avatar={d.avatar} name={d.name} id={d.id} key={d.id} />)
    const messagesElement = messages.map(m => <Message message={m.message} id={m.id} key={m.id}/>)

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElement}

            </div>
            <AddMessageForm />
        </div>
    )
}

export default compose<React.ComponentType>(
    WithAuthRedirect
)(Dialogs)




