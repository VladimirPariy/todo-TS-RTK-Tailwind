import {FC, useState} from 'react'
import cl from './TodoItem.module.scss'
import {deleteTodo, toggleTodo} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {ITodo} from "../../types/todoTypes";
import removeSvg from '../../Assets/Image/icon-cross.svg'
import {useTheme} from "../../hooks/useTheme";


const TodoItem: FC<ITodo> = ({title, id, completed}) => {
    const dispatch = useAppDispatch()
    // const [isChecked, setIsChecked] = useState<boolean>(false)
    const toggleCheckboxHandler = () => {
        dispatch(toggleTodo(id))
    }

    const removeHandler = () => {
        dispatch(deleteTodo(id))
    }
    const getContainerTodoClassName = useTheme('containerTodo', cl)
//className={[cl['checkboxInput'], cl[completed ? "checkboxActive" : ""]].join(' ')}
    return (
        <div className={getContainerTodoClassName}>

            <input className={cl.checkbox}
                type="checkbox"
                id={id}
                checked={completed}
                onChange={toggleCheckboxHandler}/>
            <label htmlFor={id}
                className={[cl['checkboxInput'], cl[completed ? "checkboxActive" : ""]].join(' ')}
            />
            <div className={cl.title}>
                {title}
            </div>
            <button className={cl.btnForDel} onClick={removeHandler}>
                <img src={removeSvg} alt=""/>
            </button>
        </div>
    );
};

export default TodoItem;