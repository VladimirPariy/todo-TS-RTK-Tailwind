import {FC} from "react";
import AddFormTodo from "./components/AddFormTodo/AddFormTodo";
import TodoList from "./components/TodoList/TodoList";
import FiltersPanel from "./components/FiltersPanel/FiltersPanel";
import cl from "./App.module.scss";
import Header from "./components/Header/Header";
import SwitchThemeAndLogo from "./components/SwitchThemeAndLogo/SwitchThemeAndLogo";
import {useTheme} from "./hooks/useTheme";

const App: FC = () => {
    const setAppClassName = useTheme('app', cl)
    const setContainerClassName = useTheme('containerForStyle', cl)
    return (
        <div className={setAppClassName}>
            <Header/>
            <div className={setContainerClassName}>
                <div className={cl.wrapper}>
                    <SwitchThemeAndLogo/>
                    <AddFormTodo/>
                    <FiltersPanel/>
                    <TodoList/>
                </div>
            </div>
        </div>
    );
}

export default App;
