import React, {FC} from 'react';
import cl from "./ExtraMenu.module.scss";
import {useSelectTodo} from "../../hooks/useSelectTodo";
import {ITodo} from "../../types/ITodo";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import { removeCompletedItem } from '../../store/slice/todoSlice';

const ExtraMenu: FC = () => {

    const activeTodo = useSelectTodo('Active')
    const dispatch = useAppDispatch()

    const amountActiveTask = (amountTask: ITodo[]): string => {
        if (amountTask.length < 2) {
            return `${amountTask.length} item left`
        }
        return `${amountTask.length} items left`
    }

    const removeCompletedHandle = () => {
        dispatch(removeCompletedItem())
    }

    return (
        <div className={cl.extraMenu}>
            <div className={cl.activeItem}>{amountActiveTask(activeTodo)}</div>
            <button className={cl.clearCompleted} onClick={removeCompletedHandle}>Clear completed</button>
        </div>
    );
};

export default ExtraMenu;