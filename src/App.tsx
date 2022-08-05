import {FC} from "react";
import AddFormTodo from "./components/AddFormTodo/AddFormTodo";
import TodoList from "./components/TodoList/TodoList";
import FiltersPanel from "./components/FiltersPanel/FiltersPanel";
import cl from "./App.module.scss";
import Header from "./components/Header/Header";
import SwitchThemeAndLogo from "./components/SwitchThemeAndLogo/SwitchThemeAndLogo";

const App: FC = () => {
    return (
        <>
            <Header/>
            <div className={cl.wrapper}>
                <SwitchThemeAndLogo/>
                <AddFormTodo/>
                <TodoList/>
                <FiltersPanel/>
            </div>
        </>
    );
}

export default App;
