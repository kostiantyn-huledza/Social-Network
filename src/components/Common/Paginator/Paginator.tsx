import React, {FC, useEffect, useState} from "react";
import cn from "classnames"
import styles from '../Paginator/Paginator.module.css';
import {Button} from "antd";

const Paginator: FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChange, portionSize = 7}) => {
    let pageCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage, portionSize]);
    //При уходе со страницы юзеров на другую и при повторном возвращении на неё,
    // пагинация подгоняется под текущую страницу юзеров, которая записана в userReducer

    let portionCount = Math.ceil(pageCount / portionSize);

    let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>
            {portionNumber > 1 &&
                <Button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>prev</Button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                        return <span className={cn({[styles.selectedPage]: currentPage === p
                            }, styles.pageNumber)}
                            key={p} onClick={() => { onPageChange(p) }}>{p}</span> })}

            {portionCount > portionNumber &&
                <Button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>next</Button>}
        </div>
    )
}

export default Paginator;

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    portionSize?: number
}