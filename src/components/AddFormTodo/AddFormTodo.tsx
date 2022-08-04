import {ChangeEvent, FC, FormEvent, useState} from "react";
import cl from './AddFormTodo.module.scss'
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
        <>
            <form className={cl.form} onSubmit={submitHandle}>
                <button className={cl.button}>
                    Add
                </button>
                <input type="text"
                       className={cl.input}
                       value={todoValue}
                       onChange={onInputChangeHandler}/>

            </form>
        </>
    )
}
export default AddFormTodo