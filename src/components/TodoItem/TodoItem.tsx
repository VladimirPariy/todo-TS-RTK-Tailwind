import {FC} from 'react'
import cl from './TodoItem.module.scss'
import {deleteTodo, toggleTodo} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {ITodo} from "../../types/todoTypes";


const TodoItem: FC<ITodo> = ({title, id, completed}) => {
    const dispatch = useAppDispatch()

    const toggleCheckboxHandler = () => {
        dispatch(toggleTodo(id))
    }

    const removeHandler = () => {
        dispatch(deleteTodo(id))
    }

    return (
        <div className={cl.containerTodo}>
            <input type="checkbox" className={cl.checkboxInput} name='checkboxInput'
                   onChange={toggleCheckboxHandler} checked={completed}/>
            <label htmlFor="checkboxInput"></label>

            <div className={cl.title}>
                {title}
            </div>
            <button className={cl.btnForDel} onClick={removeHandler}>
                delete
            </button>
        </div>
    );
};

export default TodoItem;