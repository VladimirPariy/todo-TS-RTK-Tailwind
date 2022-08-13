import {DragEvent, FC, useState} from 'react';
import cl from './TodoList.module.scss'
import {ITodo} from '../../types/ITodo';
import TodoItem from "../TodoItem/TodoItem";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectFilter} from "../../store/slice/filtersSlice";
import {useSelectTodo} from "../../hooks/useSelectTodo";
import ExtraMenu from "../ExtraMenu/ExtraMenu";
import {useTheme} from "../../hooks/useTheme";
import {dragAndDropTodo} from "../../store/slice/todoSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {themeSelector} from "../../store/slice/themeSlice";


const TodoList: FC = () => {
  const filter = useAppSelector(selectFilter)
  const todos = useSelectTodo(filter)
  const dispatch = useAppDispatch()
  const getContainerListClassName = useTheme('containerList', cl)
  const theme = useAppSelector(themeSelector)

  const [currentCard, setCurrentCard] = useState<ITodo | null>(null)

  const backgroundForTodo = theme === 'light' ? 'hsl(0, 0%, 98%)' : 'hsl(235, 24%, 19%)'
  const backgroundIfDragging = theme === 'light' ? 'hsl(236, 33%, 92%)' : 'hsl(235, 21%, 11%)'

  const dragStartHandler = (event: DragEvent<HTMLDivElement>, todo: ITodo): void => {
    setCurrentCard(todo)
  }

  const dragOverHandler = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    event.currentTarget.style.background = backgroundIfDragging
  }

  const dragLeaveHandler = (event: DragEvent<HTMLDivElement>): void => {
    event.currentTarget.style.background = backgroundForTodo
  }

  const dragEndHandler = (event: DragEvent<HTMLDivElement>): void => {
    event.currentTarget.style.background = backgroundForTodo
  }

  const dropHandler = (event: DragEvent<HTMLDivElement>, todo: ITodo): void => {
    event.preventDefault()
    event.currentTarget.style.background = backgroundForTodo
    dispatch(dragAndDropTodo({todo, currentCard, todos}))
  }


  return (
    <div className={getContainerListClassName}>
      {todos.map((todo: ITodo) => (
        <TodoItem key={todo.id}
                  dragStartHandler={dragStartHandler}
                  dragOverHandler={dragOverHandler}
                  dragLeaveHandler={dragLeaveHandler}
                  dragEndHandler={dragEndHandler}
                  dropHandler={dropHandler}
                  todo={todo}/>
      ))}
      <ExtraMenu/>
    </div>
  );
};

export default TodoList;