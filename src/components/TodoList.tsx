import React, { useState } from 'react';
import {Button, TextInput, Group, Stack, Card, Text, Badge} from '@mantine/core';
import {useForm, isNotEmpty} from '@mantine/form'
import { FormRule } from '@mantine/form/lib/types';

interface TodoItem {
  id: number;
  taskDescription: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todoListItems, setTodoListItems] = useState<TodoItem[]>([]);

  const addTodoItemToList = (values: typeof form.values) => {
    const newTodoItem : TodoItem = {
        id: values.id,
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
        id:Date.now(),
        taskDescription:"",
        completed: false,
    },
    validate:{
        taskDescription: isNotEmpty('The Task should have a Description'),
    }

  });

  return (
    <>
    <div>
      <form onSubmit={form.onSubmit((values) => addTodoItemToList(values))}>
        <TextInput
            label="Task Description"
            placeholder='Please describe the task to add to the To-Do list'
            key={form.key('id')}
            {...form.getInputProps('taskDescription')}/>
        <Group justify='flex-end' mt="md">
            <Button type='submit'>Add Task</Button>
        </Group>
      </form>
    </div>

    <div>
        <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="center"
        gap="xl">
            <ul>
                {todoListItems.map(todo =>(
                    <Card
                    shadow="sm" 
                    padding="lg" 
                    radius="md" 
                    withBorder
                    key={todo.id}
                    >
                        <Text 
                        size="sm" 
                        c="dimmed">
                            {todo.taskDescription}
                        </Text>
                        <Badge color={todo.completed? 'green':'yellow'}>{todo.completed ? 'Completed' : 'Not Completed'}</Badge>
                    </Card>
                ))}
            </ul>

        </Stack>
    </div>
    </>

  );
};

export default TodoList;
