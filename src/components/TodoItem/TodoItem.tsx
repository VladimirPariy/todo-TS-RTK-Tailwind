import {FC, useState} from 'react'
import cl from './TodoItem.module.scss'
import {deleteTodo, isUpdatingTodo, toggleTodo} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {ITodo} from "../../models/ITodo";
import {useTheme} from "../../hooks/useTheme";
import {useScreenWidth} from "../../hooks/useScreenWidth";
import {BsPencil} from 'react-icons/bs';
import CrossSvg from "../../Assets/Image/CrossSVG";
import UpdatingTitle from "../UpdatingForm/UpdatingTitle";
import {Reorder} from 'framer-motion';


interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = (props) => {

  const {
    todo,
    todo: {title, id, completed, isUpdating},
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
    <Reorder.Item as='div' value={todo} id={id}>
      <div className={getContainerTodoClassName}>
        <input className={cl.checkbox}
               type="checkbox"
               id={id}/>
        <label htmlFor={id}
               className={getLabelClassName}
               onClick={toggleCheckboxHandler}/>
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
    </Reorder.Item>
  );
};

export default TodoItem;