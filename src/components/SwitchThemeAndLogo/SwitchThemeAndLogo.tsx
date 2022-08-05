import React, {FC} from 'react';
import darkSvg from '../../Assets/Image/icon-moon.svg'
import lightSvg from '../../Assets/Image/icon-sun.svg'
import cl from './SwitchThemeAndLogo.module.scss'

const SwitchThemeAndLogo: FC = () => {
    const theme = 'dark'
    return (
        <div className={cl.wrapper}>
            <div className={cl.logo}>
                TODO
            </div>
            <img src={theme === 'dark' ? lightSvg : darkSvg}
                 alt="theme"
                 className={cl.switchTheme}/>
        </div>
    );
};

export default SwitchThemeAndLogo;