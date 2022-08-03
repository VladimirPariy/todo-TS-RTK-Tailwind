import {FC} from "react";
import AddFormTodo from "./components/AddFormTodo/AddFormTodo";
import TodoList from "./components/TodoList/TodoList";

const App: FC = () => {
    return (
        <>
            <AddFormTodo/>
            <TodoList/>
        </>
    );
}

export default App;
