import {DragEvent, FC, useState} from 'react'
import cl from './TodoItem.module.scss'
import {deleteTodo, isUpdatingTodo, toggleTodo} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {ITodo} from "../../types/ITodo";
import {useTheme} from "../../hooks/useTheme";
import {useScreenWidth} from "../../hooks/useScreenWidth";
import {BsPencil} from 'react-icons/bs';
import CrossSvg from "../../Assets/Image/CrossSVG";
import UpdatingTitle from "../UpdatingForm/UpdatingTitle";


interface TodoItemProps {
  todo: ITodo;
  dragStartHandler: (e: DragEvent<HTMLDivElement>, card: ITodo) => void
  dragLeaveHandler: (e: DragEvent<HTMLDivElement>) => void
  dragEndHandler: (e: DragEvent<HTMLDivElement>) => void
  dragOverHandler: (e: DragEvent<HTMLDivElement>) => void
  dropHandler: (e: DragEvent<HTMLDivElement>, card: ITodo) => void
}


const TodoItem: FC<TodoItemProps> = ({
                                       dragStartHandler,
                                       dragLeaveHandler,
                                       dragEndHandler,
                                       dragOverHandler,
                                       dropHandler, todo, todo: {title, id, completed, isUpdating}
                                     }) => {
  const dispatch = useAppDispatch()
  const userWidth = useScreenWidth()
  const [taskValue, setTaskValue] = useState<string>(title)

  const getTitleClassName = [cl.title, userWidth > 400 ? cl.titleMore400px : cl.titleLess400px].join(' ')
  const getContainerTodoClassName = useTheme('containerTodo', cl)

  const toggleCheckboxHandler = () => {
    dispatch(toggleTodo(id))
  }

  const removeHandler = () => {
    dispatch(deleteTodo(id))
  }

  const startUpdateHandler = (): void => {
    setTaskValue(title)
    dispatch(isUpdatingTodo(id))
  }


  return (
    <div className={`${getContainerTodoClassName} ${completed ? cl.completed : ''}`}
         draggable={true}
         onDragStart={(e) => dragStartHandler(e, todo)}
         onDragOver={(e) => dragOverHandler(e)}
         onDragLeave={(e) => dragLeaveHandler(e)}
         onDragEnd={(e) => dragEndHandler(e)}
         onDrop={(e) => dropHandler(e, todo)}>

      <input className={cl.checkbox}
             type="checkbox"
             id={id}
             checked={completed}
             onChange={toggleCheckboxHandler}/>
      <label htmlFor={id}
             className={[cl['checkboxLabel'], cl[completed ? "checkboxActive" : ""]].join(' ')}
      />
      <div className={isUpdating ? cl.none : getTitleClassName}>
        {title}
      </div>

      <UpdatingTitle isUpdating={isUpdating} id={id} title={title} taskValue={taskValue} setTaskValue={setTaskValue}/>

      <button onClick={startUpdateHandler} className={cl.btnForUpdating}>
        <BsPencil/>
      </button>
      <button className={cl.btnForDel} onClick={removeHandler}>
        <CrossSvg/>
      </button>
    </div>
  );
};

export default TodoItem;