import React, {FC} from 'react';
import cl from "./ExtraMenu.module.scss";
import {useSelectTodo} from "../../hooks/useSelectTodo";
import {ITodo} from "../../types/todoTypes";

const ExtraMenu: FC = () => {

    const activeTodo = useSelectTodo('Active')

    const amountActiveTask = (amountTask: ITodo[]): string => {
        if (amountTask.length < 2) {
            return `${amountTask.length} item left`
        }
        return `${amountTask.length} items left`
    }

    return (
        <div className={cl.extraMenu}>
            <div className={cl.activeItem}>{amountActiveTask(activeTodo)}</div>
            <button className={cl.clearCompleted}>Clear completed</button>
        </div>
    );
};

export default ExtraMenu;