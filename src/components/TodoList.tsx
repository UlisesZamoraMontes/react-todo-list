import React, { useState } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todoListItems, setTodoListItems] = useState<TodoItem[]>([]);

  const addTodoItemToList = (newTodoItem: TodoItem) => {
    setTodoListItems((prevTodoListItems) => [
      ...prevTodoListItems,
      newTodoItem,
    ]);
  };

  const handleNewTodoItem = () => {};

  return (
    <>
        <div>
      <form onSubmit={handleNewTodoItem}>
        <div >
        <div >
        <h2 >Add a new Task</h2>
        <div >
          <div >
            <label>
              What would you like to do in this task?
            </label>
            <input
              type="text"
              name="tasktext"
              placeholder="Write here the task to add"
              required
            />
          </div>

          <div>
            <button
              type="submit"
            >
              Add Task
            </button>
            </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </>

  );
};

export default TodoList;
