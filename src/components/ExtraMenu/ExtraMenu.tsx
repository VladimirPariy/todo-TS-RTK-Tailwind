import React, {FC} from 'react';
import cl from "./ExtraMenu.module.scss";
import {useSelectTodo} from "../../hooks/useSelectTodo";
import {ITodo} from "../../models/ITodo";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {removeCompletedItem} from '../../store/slice/todoSlice';

const ExtraMenu: FC = () => {
  const activeTodo = useSelectTodo('Active')
  const dispatch = useAppDispatch()

  const amountActiveTask = (amountTask: ITodo[]): string => {
    return amountTask.length < 2 ? `${amountTask.length} item left` : `${amountTask.length} items left`
  }

  const removeCompletedHandle = () => {
    dispatch(removeCompletedItem())
  }

  return (
    <div className={cl.extraMenu}>
      <div className={cl.activeItem}>
        {amountActiveTask(activeTodo)}
      </div>
      <button className={cl.clearCompleted}
              onClick={removeCompletedHandle}>
        Clear completed
      </button>
    </div>
  );
};

export default ExtraMenu;