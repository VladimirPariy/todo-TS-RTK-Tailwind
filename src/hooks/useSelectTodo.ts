import {selectTodoActive, selectTodoAll, selectTodoCompleted} from "../store/slice/todoSlice";
import {useAppSelector} from "./useAppSelector";
import {ITodo} from "../types/todoTypes";

export const useSelectTodo = (filter: string): ITodo[] | [] => {
    let selector
    if (filter === 'All') {
        selector = selectTodoAll
    } else if (filter === 'Active') {
        selector = selectTodoActive
    } else {
        selector = selectTodoCompleted
    }
    return useAppSelector(selector)
}