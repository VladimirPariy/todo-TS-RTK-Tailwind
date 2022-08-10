export interface ITodo {
  title: string;
  id: string;
  completed: boolean;
  isUpdating: boolean;
}

export interface IUpdatingTodo {
  id: string;
  title: string;
}