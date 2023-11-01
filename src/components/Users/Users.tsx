import React, {FC, useEffect} from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, followTC, requestUsers, unfollowTC} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentPage,
    selectFollowingInProgress,
    selectPageSize,
    selectTotalUserCount,
    selectUsers,
    selectUsersFilter
} from "../../redux/users-selectors";
import {AppDispatch} from "../../redux/redux-store";
import {createSearchParams, useLocation, useNavigate} from "react-router-dom";

export const Users: FC = () => {

    const totalUserCount = useSelector(selectTotalUserCount)
    const pageSize = useSelector(selectPageSize)
    const currentPage = useSelector(selectCurrentPage)
    const filter = useSelector(selectUsersFilter)
    const followingInProgress = useSelector(selectFollowingInProgress)
    const users = useSelector(selectUsers)

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const useNavigateSearch = () => {
        return (pathname: string, params: UsersParamsType) =>
            navigate(`${pathname}?${createSearchParams(params)}`);
    }
    const navigateSearch = useNavigateSearch()

    useEffect(() => {

        const params = new URLSearchParams(location.search)

        let actualPage = currentPage
        let actualFilter = filter

        const parsedTerm = params.get('term')
        const parsedPage = params.get('page')
        const parsedFriend = params.get('friend')


        if (parsedPage) actualPage = Number(parsedPage)
        if (parsedTerm) actualFilter = {...actualFilter, term: parsedTerm}

        switch (parsedFriend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [location.search])

    useEffect(() => {

        navigateSearch("/developers", {
            page: `${currentPage}`,
            count: `${pageSize}`,
            term: `${filter.term}`,
            friend: `${filter.friend}`,
        });

    }, [filter, currentPage, pageSize]);


    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(followTC(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowTC(userId))
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator totalItemsCount={totalUserCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChange={onPageChanged}/>
        {users.map(u => <User key={u.id}
                              user={u}
                              followingInProgress={followingInProgress}
                              unfollow={unfollow}
                              follow={follow}/>)
        }
    </div>
}

type UsersParamsType = {
    page: string
    count: string
    term: string
    friend: 'null' | 'true' | 'false'
}
