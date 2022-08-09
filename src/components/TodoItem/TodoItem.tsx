import {FC, useState} from 'react'
import cl from './TodoItem.module.scss'
import {deleteTodo, toggleTodo} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {ITodo} from "../../types/todoTypes";
import removeSvg from '../../Assets/Image/icon-cross.svg'
import {useTheme} from "../../hooks/useTheme";


const TodoItem: FC<ITodo> = ({title, id, completed}) => {
  const dispatch = useAppDispatch()

  const toggleCheckboxHandler = () => {
    dispatch(toggleTodo(id))
  }

  const removeHandler = () => {
    dispatch(deleteTodo(id))
  }
  const getContainerTodoClassName = useTheme('containerTodo', cl)

  return (
    <div className={`${getContainerTodoClassName} ${completed ? cl.completed : ''}`}>

      <input className={cl.checkbox}
             type="checkbox"
             id={id}
             checked={completed}
             onChange={toggleCheckboxHandler}/>
      <label htmlFor={id}
             className={[cl['checkboxLabel'], cl[completed ? "checkboxActive" : ""]].join(' ')}
      />
      <div className={cl.title}>
        {title}
      </div>
      <button className={cl.btnForDel} onClick={removeHandler}>
        <img src={removeSvg} alt="" className={cl.img}/>
      </button>
    </div>
  );
};

export default TodoItem;