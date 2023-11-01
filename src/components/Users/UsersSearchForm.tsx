import {useForm} from "react-hook-form";
import s from './users.module.css';
import React, {FC, useEffect} from "react";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {selectUsersFilter} from "../../redux/users-selectors";
import Input from "antd/es/input/Input";

export const UsersSearchForm: FC<PropsType> = React.memo((props) => {

    const filter = useSelector(selectUsersFilter)

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormType>({
        defaultValues: {
            term: filter.term,
            friend: String(filter.friend) as FriendFormType
        }
    })

    useEffect(() => {
        reset();
    }, [])

    const onSubmit = (data: FormType) => {

        const filter: FilterType = {
            term: data.term,
            friend: data.friend === "null" ? null : data.friend === "true"
        }
        props.onFilterChanged(filter)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="search users"
                    style={{ width: 200 }}
                    {...register("term", {required: false, maxLength: 10})} />
            {errors.term && <p>This field is required</p>}
            <Input  type="submit"
                   style={{ width: 70, marginLeft: 5}}
                   value="Search"/>
            <div>
                <select className={s.select}
                    {...register("friend")}>
                    <option value="null">All</option>
                    <option value="true"> Only followed</option>
                    <option value="false">Only unfollowed</option>
                </select>
            </div>
        </form>
    )
})


type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'null' | 'true' | 'false';
type FormType = {
    term: string
    friend: FriendFormType
}

