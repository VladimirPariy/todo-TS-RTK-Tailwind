import React, {FC} from 'react';
import darkSvg from '../../Assets/Image/icon-moon.svg'
import lightSvg from '../../Assets/Image/icon-sun.svg'
import cl from './SwitchThemeAndLogo.module.scss'
import {useAppSelector} from "../../hooks/useAppSelector";
import {themeSelector, toggleTheme} from "../../store/slice/themeSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {themeType} from '../../models/themeTypes';


const SwitchThemeAndLogo: FC = () => {
  const theme = useAppSelector(themeSelector)
  const dispatch = useAppDispatch()

  const reverseTheme: themeType = theme === 'light' ? 'dark' : 'light'

  const switchTheme = () => {
    dispatch(toggleTheme(reverseTheme))
  }

  return (
    <div className={cl.wrapper}>
      <div className={cl.logo}>
        TODO
      </div>
      <img src={theme === 'dark' ? lightSvg : darkSvg}
           alt="theme"
           className={cl.switchTheme}
           onClick={switchTheme}/>
    </div>
  );
};

export default SwitchThemeAndLogo;