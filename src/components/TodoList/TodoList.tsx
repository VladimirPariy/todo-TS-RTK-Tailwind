import {FC} from 'react';
import cl from './TodoList.module.scss'
import {ITodo} from '../../types/todoTypes';
import TodoItem from "../TodoItem/TodoItem";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectFilter} from "../../store/slice/filtersSlice";
import {useSelectTodo} from "../../hooks/useSelectTodo";


const TodoList: FC = () => {
    const filter = useAppSelector(selectFilter)
    const todos = useSelectTodo(filter)

    return (
        <div className={cl.containerList}>
            {todos.map((todo: ITodo) => (
                <TodoItem key={todo.id} title={todo.title} completed={todo.completed} id={todo.id}/>
            ))}
            <div className={cl.extraMenu}>
                <div className={cl.activeItem}>{todos.length} item left</div>
                <button className={cl.clearCompleted}>Clear completed</button>
            </div>
        </div>
    );
};

export default TodoList;