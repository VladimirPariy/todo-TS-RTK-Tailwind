import React, {FC, useEffect, useState} from 'react';
import cl from './Header.module.scss'
import mobImg from '../../Assets/Image/bg-mobile-dark.jpg'
import desImg from '../../Assets/Image/bg-desktop-dark.jpg'

const Header: FC = () => {

    const [userWidth, setUserWidth] = useState<number>(window.innerWidth)


    const updateWidthScreen = () => {
        setUserWidth(window.innerWidth)
    }


    useEffect(() => {
        window.addEventListener("resize", updateWidthScreen);
        return () => {
            window.removeEventListener("resize", updateWidthScreen)
        }
    }, [])

    let headerImg:string = userWidth > 500 ? desImg : mobImg

    return (
        <div className={cl.header}>
            <img src={headerImg} alt="" className={cl.img}/>
        </div>
    );
};

export default Header;