import {ChangeEvent, useEffect, useState} from "react";
import {FC} from "react";

const ProfileStatus: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div style={{marginTop: '20px'}}>
            {!editMode &&
                <div>
                    <b>Status: </b><span onDoubleClick={activateEditMode}>{props.status || "-----"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange}
                           onBlur={deactivateEditMode}
                           value={status}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatus

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}