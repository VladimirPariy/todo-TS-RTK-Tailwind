import {FC} from 'react'
import cl from './TodoItem.module.scss'
import {deleteTodo, isUpdatingTodo, toggleTodo} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {ITodo} from "../../types/todoTypes";
import {useTheme} from "../../hooks/useTheme";
import {useScreenWidth} from "../../hooks/useScreenWidth";
import {BsPencil} from 'react-icons/bs';
import UpdatingTitle from "../UpdatingForm/UpdatingTitle";
import CrossSvg from "../../Assets/Image/CrossSVG";


const TodoItem: FC<ITodo> = ({title, id, completed, isUpdating}) => {
  const dispatch = useAppDispatch()
  const userWidth = useScreenWidth()

  const titleClassName = [cl.title, userWidth > 400 ? cl.titleMore400px : cl.titleLess400px].join(' ')
  const getContainerTodoClassName = useTheme('containerTodo', cl)

  const toggleCheckboxHandler = () => {
    dispatch(toggleTodo(id))
  }
  const removeHandler = () => {
    dispatch(deleteTodo(id))
  }


  const startUpdateHandler = (): void => {
    dispatch(isUpdatingTodo(id))
  }


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
      <div className={isUpdating ? cl.none : titleClassName}>
        {title}
      </div>

      <UpdatingTitle isUpdating={isUpdating} id={id} title={title}/>

      <button onClick={startUpdateHandler} className={cl.btnForUpdating}>
        <BsPencil/>
      </button>
      <button className={cl.btnForDel} onClick={removeHandler} >
        <CrossSvg/>
      </button>
    </div>
  );
};

export default TodoItem;