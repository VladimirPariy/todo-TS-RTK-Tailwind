import {ChangeEvent, FC, FormEvent, useState} from "react";
import cl from './AddFormTodo.module.scss'
import { AiOutlinePlus } from 'react-icons/ai';
import {useDispatch} from "react-redux";
import {addTodo} from "../../store/slice/todoSlice";


const AddFormTodo: FC = () => {

    const [todoValue, setTodoValue] = useState<string>('')
    const dispatch = useDispatch()

    const submitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addTodo(todoValue))
        setTodoValue('')
    }

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoValue(e.target.value)
    }

    return (
        <form className={[cl.form, cl.dark].join(' ')} onSubmit={submitHandle}>
            <input type="text"
                   className={cl.input}
                   value={todoValue}
                   onChange={onInputChangeHandler}/>
            <button className={cl.button}>
                <AiOutlinePlus/>
            </button>
        </form>
    )
}
export default AddFormTodo