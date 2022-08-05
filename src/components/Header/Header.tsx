import React, {FC} from 'react';
import cl from './Header.module.scss'
import mobDarkImg from '../../Assets/Image/bg-mobile-dark.jpg'
import desDarkImg from '../../Assets/Image/bg-desktop-dark.jpg'
import mobLightImg from '../../Assets/Image/bg-mobile-light.jpg'
import desLightImg from '../../Assets/Image/bg-desktop-light.jpg'
import {useScreenWidth} from "../../hooks/useScreenWidth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {themeSelector} from "../../store/slice/themeSlice";

const Header: FC = () => {

    const theme = useAppSelector(themeSelector)
    const userWidth = useScreenWidth()

    const headerDarkImg: string = userWidth > 500 ? desDarkImg : mobDarkImg
    const headerLightImg: string = userWidth > 500 ? desLightImg : mobLightImg
    const headerImg = theme === 'light' ? headerLightImg : headerDarkImg

    return (
        <div className={cl.header}>
            <img src={headerImg} alt="" className={cl.img}/>
        </div>
    );
};

export default Header;