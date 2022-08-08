import {FC} from 'react';
import cl from './TodoList.module.scss'
import {ITodo} from '../../types/todoTypes';
import TodoItem from "../TodoItem/TodoItem";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectFilter} from "../../store/slice/filtersSlice";
import {useSelectTodo} from "../../hooks/useSelectTodo";
import ExtraMenu from "../ExtraMenu/ExtraMenu";
import {useTheme} from "../../hooks/useTheme";
import {BiTaskX} from "react-icons/bi";


const TodoList: FC = () => {
    const filter = useAppSelector(selectFilter)
    const todos = useSelectTodo(filter)
    const getContainerListClassName = useTheme('containerList', cl)
    return (

        <div className={getContainerListClassName}>
            {todos.map((todo: ITodo) => (
                <TodoItem key={todo.id} title={todo.title} completed={todo.completed} id={todo.id}/>
            ))}
            {todos.length > 0 &&
                <>
                    <ExtraMenu/>
                    <div className={cl.text}>Drag and drop to reorder list</div>
                </>}

            {todos.length === 0 &&
                <div className={cl.emptyList}>
                    <BiTaskX/>
                    <div className={cl.title}>You don't have any tasks registered yet.</div>
                    <div className={cl.body}>Create tasks and organize your to-do items</div>
                </div>
            }
        </div>
    );
};

export default TodoList;