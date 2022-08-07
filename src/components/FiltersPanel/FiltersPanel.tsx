import React, {FC} from 'react';
import cl from './FiltersPanel.module.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {selectFilter, setFilter} from '../../store/slice/filtersSlice';
import {filtersType} from '../../types/filterTypes';
import ButtonForFilters from "../UI/ButtonForFilters/ButtonForFilters";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useTheme} from "../../hooks/useTheme";


const FiltersPanel: FC = () => {

    const dispatch = useAppDispatch()
    const filter = useAppSelector(selectFilter)

    const getFilterContainerClassName = useTheme('filterContainer', cl)

    const filterHandler = (str: filtersType) => {
        dispatch(setFilter(str))
    }

    return (
        <div className={getFilterContainerClassName}>
            <ButtonForFilters filter={filter} onClickHandler={filterHandler} attr='All'/>
            <ButtonForFilters filter={filter} onClickHandler={filterHandler} attr='Active'/>
            <ButtonForFilters filter={filter} onClickHandler={filterHandler} attr='Completed'/>
        </div>
    );
};

export default FiltersPanel;