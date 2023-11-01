import style from './Header.module.css';
import {Link} from "react-router-dom";
import React, {FC} from "react";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {AppDispatch} from "../../redux/redux-store";
import {logoutTC} from "../../redux/auth-reducer";
import {getItem, MenuItem} from "../Navbar/Navbar";


const Header: FC = () => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const dispatch: AppDispatch = useDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    const {Header} = Layout;

    const itemsHeader: MenuItem[] = [
        getItem(<Link to='/profile'>Developer Kostya</Link>, 'DeveloperKostya'),
        getItem(<Link to='*'>Developer Taras</Link>, 'DeveloperTaras')
    ]

    return (
        <>
            <Header className={style.header}>
                <Row>
                    <Col span={20}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['DevelopersHeader']}
                              items={itemsHeader}/>
                    </Col>
                    <Col span={4}>
                        {isAuth
                            ? <div>
                                <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>K</Avatar>
                                <Link className={style.loginBlock} to={'/profile'}>{login}</Link>
                                <Button onClick={logout}>Log out</Button>
                            </div>
                            : <div>
                                <Button>
                                    <Link to={'/login'}>Login</Link>
                                </Button>
                            </div>
                        }
                    </Col>
                </Row>
            </Header>
        </>
    )
}

export default Header;

