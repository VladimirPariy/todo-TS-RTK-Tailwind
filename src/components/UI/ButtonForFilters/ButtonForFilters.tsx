import React, {FC} from 'react';
import cl from "./ButtonForFilters.module.scss";
import {filtersType} from "../../../types/filterTypes";
import {useTheme} from "../../../hooks/useTheme";

interface ButtonForFiltersProps {
    onClickHandler: (str: filtersType) => void;
    attr: filtersType;
    filter:string
}

const ButtonForFilters:FC<ButtonForFiltersProps> = ({ onClickHandler, filter,  attr}) => {

    const getClass = (attribute: filtersType): string => {
        return filter === attribute ? 'active' : 'notActive'
    }
    const getBtnClassName = useTheme('button', cl)
    const btnClasses = [cl[getClass(attr)]].join(' ') + ` ${getBtnClassName}`

    return (
        <button onClick={() => onClickHandler(attr)}
                className={btnClasses }>
            {attr}
        </button>
    );
};

export default ButtonForFilters;