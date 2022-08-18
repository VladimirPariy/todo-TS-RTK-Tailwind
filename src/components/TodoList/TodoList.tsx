import {FC} from 'react';
import cl from './TodoList.module.scss'
import {ITodo} from '../../models/ITodo';
import TodoItem from "../TodoItem/TodoItem";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectFilter} from "../../store/slice/filtersSlice";
import {useSelectTodo} from "../../hooks/useSelectTodo";
import ExtraMenu from "../ExtraMenu/ExtraMenu";
import {useTheme} from "../../hooks/useTheme";
import {updatingState} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {AnimatePresence, Reorder} from 'framer-motion';


const TodoList: FC = () => {
  const filter = useAppSelector(selectFilter)
  const todos = useSelectTodo(filter)

  const dispatch = useAppDispatch()

  const getContainerListClassName = useTheme('containerList', cl)

  const updatingTodoState = (card: ITodo[]) => {
    dispatch(updatingState(card))
  }

  return (

    <div className={getContainerListClassName}>
      <Reorder.Group as='div' axis="y" onReorder={updatingTodoState} values={todos}>
        <AnimatePresence>
          {todos.map((todo: ITodo) => (
            <TodoItem key={todo.id}
                      todo={todo}/>
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <ExtraMenu/>
    </div>
  );
};

export default TodoList;