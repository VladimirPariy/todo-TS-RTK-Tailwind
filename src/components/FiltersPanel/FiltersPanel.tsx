import React, {FC} from 'react';
import cl from './FiltersPanel.module.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {selectFilter, setFilter} from '../../store/slice/filtersSlice';
import {useAppSelector} from "../../hooks/useAppSelector";

enum filters {
    allTodo = 'all',
    activeTodo = 'active',
    completedTodo ='completed'
}

const FiltersPanel: FC = () => {

    const dispatch = useAppDispatch()
    const filter = useAppSelector(selectFilter)

    const filterHandler = (str: filters) => {
        dispatch(setFilter(str))
    }

    const getClassName = (nameAttribute: string) => filter === nameAttribute ? 'active' : 'notActive'

    return (
        <div className={cl.filterContainer}>
            <button onClick={() => filterHandler(filters.allTodo)}
                    className={cl[getClassName(filters.allTodo)]}>
                All
            </button>

            <button onClick={() => filterHandler(filters.activeTodo)}
                    className={cl[getClassName(filters.activeTodo)]}>
                Active
            </button>
            <button onClick={() => filterHandler(filters.completedTodo)}
                    className={cl[getClassName(filters.completedTodo)]}>
                Completed
            </button>
        </div>
    );
};

export default FiltersPanel;