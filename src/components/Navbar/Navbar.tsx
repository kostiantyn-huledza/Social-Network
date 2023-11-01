import {LaptopOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import React from "react";
import {MenuProps} from "antd";

export function getItem(label: React.ReactNode,
                        key?: React.Key | null,
                        icon?: React.ReactNode,
                        children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}

export const itemsSideMenu: MenuItem[] = [
    getItem('My Profile', 'MyProfile', <UserOutlined rev={undefined}/>, [
        getItem(<Link to='/profile'>Profile</Link>, 'Profile'),
        getItem(<Link to='/dialogs'>Messages</Link>, 'Messages')
    ]),
    getItem('Developers', 'Developers', <LaptopOutlined rev={undefined}/>, [
        getItem(<Link to='/developers'>Developers list</Link>, 'DevelopersList'),
        getItem(<Link to='/chat'>Developers chat</Link>, 'DevelopersChat')
    ]),
    getItem('Settings', 'Settings', <SettingOutlined rev={undefined}/>, [
        getItem(<Link to='/news'>News</Link>, 'News'),
        getItem(<Link to='/music'>Music</Link>, 'Music')
    ])
]

export type MenuItem = Required<MenuProps>['items'][number];