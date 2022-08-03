import {FC} from 'react';
import cl from './TodoList.module.scss'
import {useSelector} from 'react-redux'
import { ITodo } from '../../types/todoTypes';
import {selectTodo} from "../../store/slice/todoSlice";
import TodoItem from "../TodoItem/TodoItem";


const TodoList: FC = () => {
    const todos = useSelector(selectTodo)
    return (
        <div className={cl.wrapper}>
            {todos.map((todo: ITodo) => (
                <TodoItem key={todo.id} title={todo.title}/>
            ))}
        </div>
    );
};

export default TodoList;