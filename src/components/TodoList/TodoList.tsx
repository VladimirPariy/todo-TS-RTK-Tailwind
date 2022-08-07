import {FC} from 'react';
import cl from './TodoList.module.scss'
import {ITodo} from '../../types/todoTypes';
import TodoItem from "../TodoItem/TodoItem";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectFilter} from "../../store/slice/filtersSlice";
import {useSelectTodo} from "../../hooks/useSelectTodo";
import ExtraMenu from "../ExtraMenu/ExtraMenu";
import {useTheme} from "../../hooks/useTheme";


const TodoList: FC = () => {
    const filter = useAppSelector(selectFilter)
    const todos = useSelectTodo(filter)
    const getContainerListClassName = useTheme('containerList', cl)
    return (
        <div className={getContainerListClassName}>
            {todos.map((todo: ITodo) => (
                <TodoItem key={todo.id} title={todo.title} completed={todo.completed} id={todo.id}/>
            ))}
            <ExtraMenu/>
        </div>
    );
};

export default TodoList;