import {DragEvent, FC, useState} from 'react'
import cl from './TodoItem.module.scss'
import {deleteTodo, isUpdatingTodo, toggleTodo} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {ITodo} from "../../models/ITodo";
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


const TodoItem: FC<TodoItemProps> = (props) => {

  const {
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
    todo,
    todo: {title, id, completed, isUpdating}
  } = props

  const dispatch = useAppDispatch()
  const userWidth = useScreenWidth()
  const [taskValue, setTaskValue] = useState<string>(title)

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


  const getTitleClassName = isUpdating ? cl.none : [cl.title, userWidth > 400 ? cl.titleMore400px : cl.titleLess400px].join(' ')
  const getContainerTodoClassName = `${useTheme('containerTodo', cl)} ${completed ? cl.completed : ''}`
  const getLabelClassName = [cl['checkboxLabel'], cl[completed ? "checkboxActive" : ""]].join(' ')

  return (
    <div className={getContainerTodoClassName}
         draggable={true}
         onDragStart={(e) => dragStartHandler(e, todo)}
         onDragOver={(e) => dragOverHandler(e)}
         onDragLeave={(e) => dragEndHandler(e)}
         onDragEnd={(e) => dragEndHandler(e)}
         onDrop={(e) => dropHandler(e, todo)}>

      <input className={cl.checkbox}
             type="checkbox"
             id={id}
             checked={completed}
             onChange={toggleCheckboxHandler}/>
      <label htmlFor={id}
             className={getLabelClassName}/>
      <div className={getTitleClassName}>{title}</div>
      <UpdatingTitle isUpdating={isUpdating}
                     id={id}
                     title={title}
                     taskValue={taskValue}
                     setTaskValue={setTaskValue}/>
      <button onClick={startUpdateHandler}
              className={cl.btnForUpdating}
              children={<BsPencil/>}/>
      <button onClick={removeHandler}
              className={cl.btnForDel}
              children={<CrossSvg/>}/>
    </div>
  );
};

export default TodoItem;