import React, {FC} from 'react';
import cl from "./ButtonForFilters.module.scss";
import {filtersType} from "../../../types/filterTypes";

interface ButtonForFiltersProps {
    onClickHandler: (str: filtersType) => void;
    attr: filtersType;
    filter:string
}

const ButtonForFilters:FC<ButtonForFiltersProps> = ({ onClickHandler, filter,  attr}) => {

    const getClass = (attribute: filtersType): string => {
        return filter === attribute ? 'active' : 'notActive'
    }

    const btnClasses = [cl[getClass(attr)], cl.button].join(' ')

    return (
        <button onClick={() => onClickHandler(attr)}
                className={btnClasses}>
            {attr}
        </button>
    );
};

export default ButtonForFilters;