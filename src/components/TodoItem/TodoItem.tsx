import {FC} from 'react'
import cl from './TodoItem.module.scss'

interface TodoItemProps {
    title: string
}

const TodoItem: FC<TodoItemProps> = ({title}) => {
    return (
        <div className={cl.container}>
            <input type="checkbox" className={cl.checkboxInput} name='checkboxInput'/>
            <label htmlFor="checkboxInput"></label>

            <div className={cl.title}>
                {title}
            </div>
            <button className={cl.btnForDel}>
                delete
            </button>
        </div>
    );
};

export default TodoItem;