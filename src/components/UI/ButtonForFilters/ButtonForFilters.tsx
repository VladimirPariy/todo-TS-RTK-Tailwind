import React, {FC} from 'react';
import cl from "./ButtonForFilters.module.scss";
import {filtersType} from "../../../models/filterTypes";
import {useTheme} from "../../../hooks/useTheme";

interface ButtonForFiltersProps {
  onClickHandler: (str: filtersType) => void;
  filterType: filtersType;
  filter: string
}

const ButtonForFilters: FC<ButtonForFiltersProps> = ({onClickHandler, filter, filterType}) => {

  const getClass = (attribute: filtersType): string => {
    return filter === attribute ? 'active' : 'notActive'
  }
  const getBtnClassName = useTheme('button', cl)
  const btnClasses = [cl[getClass(filterType)]].join(' ') + ` ${getBtnClassName}`

  return (
    <button onClick={() => onClickHandler(filterType)}
            className={btnClasses}>
      {filterType}
    </button>
  );
};

export default ButtonForFilters;