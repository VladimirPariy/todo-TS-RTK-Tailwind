import {ChangeEvent, FC, FormEvent, useState} from "react";
import cl from './AddFormTodo.module.scss'
import {AiOutlinePlus} from 'react-icons/ai';
import {addTodo} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useTheme} from "../../hooks/useTheme";


const AddFormTodo: FC = () => {

    const dispatch = useAppDispatch()
    const setFormClassName = useTheme('form', cl)

    const [todoValue, setTodoValue] = useState<string>('')

    const submitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addTodo(todoValue))
        setTodoValue('')
    }

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoValue(e.target.value)
    }

    return (
        <form className={setFormClassName} onSubmit={submitHandle}>
            <input type="text"
                   className={cl.input}
                   value={todoValue}
                   onChange={onInputChangeHandler}
                   placeholder='Create a new todo...'
            />
            <button className={cl.button}>
                <AiOutlinePlus/>
            </button>
        </form>
    )
}
export default AddFormTodo