import './App.css';
import {Link, Navigate, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./components/Common/Preloader/Preloader";
import React, {FC, lazy, Suspense, useCallback, useEffect} from "react";
import {AppDispatch, AppStateType} from "./redux/redux-store";
import {UsersPage} from "./components/Users/UsersPage";
import {LoginPage} from "./components/Login/LoginPage";
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import Header from "./components/Header/Header";
import {initializeAppTC} from "./redux/app-reducer";
import NotFound from "./components/Common/NotFound/NotFound";
import {itemsSideMenu} from "./components/Navbar/Navbar";

const DialogsPage = lazy(() => import("./components/Dialogs/Dialogs"))
const ProfilePage = lazy(() => import("./components/Profile/ProfileContainer"))
const ChatContainer = lazy(() => import("./pages/Chat/ChatPage"))

const {Content, Footer, Sider} = Layout;

const App: FC = () => {

    const initialized = useSelector((state: AppStateType) => state.app.initialized)
    const dispatch: AppDispatch = useDispatch()
    const {token: {colorBgContainer}} = theme.useToken();

    const memoizedInitializeApp = useCallback(() => {

        const initializeApp = () => {
            dispatch(initializeAppTC())
        }

        initializeApp();

    }, [dispatch])


    useEffect(() => {
        memoizedInitializeApp()
    }, [memoizedInitializeApp])

    if (!initialized) {
        return (
            <Preloader/>
        )
    }

    return (
        <Layout>
            <Header/>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item key="home">
                        <Link to='/'>Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item key="developers">
                        <Link to='/developers'>Developers</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item key="app">App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{padding: '24px 0', background: colorBgContainer}}>
                    <Sider style={{background: colorBgContainer}} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                            items={itemsSideMenu}
                        />
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Suspense fallback={<div><Preloader/></div>}>
                            <Routes>
                                <Route path='/' element={<Navigate to={'/login'}/>}/>
                                <Route path='/developers' element={<UsersPage pageTitle='Developers'/>}/>
                                <Route path='/dialogs' element={<DialogsPage/>}/>
                                <Route path='/profile/:userId' element={<ProfilePage/>}/>
                                <Route path='/profile' element={<ProfilePage/>}/>
                                <Route path='/news' element={<News/>}/>
                                <Route path='/music' element={<Music/>}/>
                                <Route path='/settings' element={<Settings/>}/>
                                <Route path='/login' element={<LoginPage/>}/>
                                <Route path='/chat' element={<ChatContainer/>}/>
                                <Route path='*' element={<NotFound/>}/>
                            </Routes>
                        </Suspense>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Social Network ©2023 Created by Kostiantyn Huledza</Footer>
        </Layout>
    )
}

export default App


