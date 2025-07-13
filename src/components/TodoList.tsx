import React, { useState } from 'react';
import {Button, TextInput, Group, Stack, Card, Text, Badge, ScrollArea, Checkbox, CheckboxIndicator} from '@mantine/core';
import {useForm, isNotEmpty} from '@mantine/form'
import { FormRule } from '@mantine/form/lib/types';
import { stringify } from 'querystring';

interface TodoItem {
  id: number;
  taskTitle: string;
  taskDescription: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todoListItems, setTodoListItems] = useState<TodoItem[]>([]);

  const addTodoItemToList = (values: typeof form.values) => {
    const newTodoItem : TodoItem = {
        id: Date.now(),
        taskTitle: values.taskTitle,
        taskDescription: values.taskDescription,
        completed: values.completed,
    };
    setTodoListItems((prevTodoListItems) => [
      ...prevTodoListItems,
      newTodoItem,
    ]);
  };


  const form = useForm({
    mode: 'uncontrolled',
    initialValues:{
        taskTitle: "",
        taskDescription:"",
        completed: false,
    },
    validate:{
        taskTitle: isNotEmpty('Please  add a title to the task'),
    }

  });

  const toggleTodoCompleted = (id: number) =>{
    setTodoListItems(prev =>
        prev.map(todo =>
            todo.id === id?{...todo, completed: !todo.completed}:todo))
  };

  return (
    <>
    <div>
      <form onSubmit={form.onSubmit((values) => addTodoItemToList(values))}>
        <TextInput
            label="Task Title"
            withAsterisk
            {...form.getInputProps('taskTitle')}/>
        <TextInput
            label="Task Description"
            placeholder='Please describe the task to add to the To-Do list'   
            {...form.getInputProps('taskDescription')}/>
        <Group justify='flex-end' mt="md">
            <Button type='submit'>Add Task</Button>
        </Group>
      </form>
    </div>

    <ScrollArea
        h={250} type="auto">
        
            <ul>
                {todoListItems.map(todo =>(
                    <Checkbox.Card
                    radius="md" 
                    checked={todo.completed}
                    onClick={() => toggleTodoCompleted(todo.id)}
                    key={todo.id}
                    >
                        <Group
                            wrap='nowrap'
                            align='flex-start'>
                        <CheckboxIndicator/>
                        <Text 
                        size="sm" 
                        c="dimmed">
                            {todo.taskTitle}
                        </Text>
                        <Text 
                        size="sm" 
                        c="dimmed">
                            {todo.taskDescription}
                        </Text>
                        <Badge 
                            color={todo.completed? 'green':'yellow'}>{todo.completed ? 'Completed' : 'Not Completed'}</Badge>
                            </Group>
                    </Checkbox.Card>
                ))}
            </ul>

        
    </ScrollArea>
    </>

  );
};

export default TodoList;
