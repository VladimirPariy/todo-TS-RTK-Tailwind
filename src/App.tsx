import {FC} from "react";
import AddFormTodo from "./components/AddFormTodo/AddFormTodo";
import TodoList from "./components/TodoList/TodoList";
import FiltersPanel from "./components/FiltersPanel/FiltersPanel";
import cl from "./App.module.scss";

const App: FC = () => {
    return (
        <div className={cl.wrapper}>
            <AddFormTodo/>
            <TodoList/>
            <FiltersPanel/>
        </div>
    );
}

export default App;
