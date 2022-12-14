import React, {FC, useEffect, useRef, useState} from "react";
import cl from './AddFormTodo.module.scss'
import {AiOutlinePlus} from 'react-icons/ai';
import {addTodo, selectTodoAll} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useTheme} from "../../hooks/useTheme";
import {isValidTodo, isValidTodoSelector} from "../../store/slice/validTodoSlice";
import {useAppSelector} from "../../hooks/useAppSelector";
import Alert from "../Alert/Alert";


const AddFormTodo: FC = () => {

  const dispatch = useAppDispatch()
  const isValid = useAppSelector(isValidTodoSelector)
  const allTodo = useAppSelector(selectTodoAll)
  const setFormClassName = useTheme('form', cl)
  const refInput = useRef<HTMLInputElement>(null)
  const [todoValue, setTodoValue] = useState<string>('')

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (todoValue.trim().length > 0) {
      dispatch(addTodo(todoValue, allTodo))
      setTodoValue('')
      refInput.current?.focus()
      return
    }
    dispatch(isValidTodo(false))
    setTodoValue('')
    refInput.current?.focus()
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value)
  }

  const inputBlurHandler = () => {
    if (!isValid) dispatch(isValidTodo(true))
  }

  useEffect(() => {
      const timeout = setTimeout(() => {
        if (!isValid) dispatch(isValidTodo(true))

      }, 2000)

      return () => clearTimeout(timeout)
    }, [isValid, dispatch]
  )

  return (
    <>
      {!isValid && <Alert> Task cannot be empty. </Alert>}
      <form className={setFormClassName} onSubmit={submitHandle}>
        <input type="text"
               className={cl.input}
               value={todoValue}
               onChange={inputChangeHandler}
               placeholder='Create a new todo...'
               ref={refInput}
               onBlur={inputBlurHandler}/>
        <button className={cl.button}
                type='submit'
                children={<AiOutlinePlus/>}/>
      </form>
    </>
  )
}
export default AddFormTodo