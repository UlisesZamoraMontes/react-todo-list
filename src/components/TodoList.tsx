import React, { useState } from 'react';
import {Button, TextInput, Group, Stack, Card, Text, Badge, ScrollArea, Checkbox, CheckboxIndicator, Container} from '@mantine/core';
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
  const deleteTodoTask = (id: number) =>{
    setTodoListItems(prev =>
      prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
    <Stack h="100vh" p="md" justify="space-between" bg="gray">
    <Container bg="gray">
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
    </Container>

<Container bg="gray">
    <ScrollArea.Autosize
        mah="400" maw="100%" mx="auto">
        
            <ul>
              <Stack>
                {todoListItems.map(todo =>(
                  <Group wrap='nowrap'
                  align='center'
                  w='100%'>
                    <Checkbox.Card
                    radius="md" 
                    p="md"
                    withBorder
                    checked={todo.completed}
                    onClick={() => toggleTodoCompleted(todo.id)}
                    key={todo.id}
                    style={{ flex: 1 }}
                    >
                        <Group
                            wrap='nowrap'
                            align='center'
                            gap="md">
                        <CheckboxIndicator/>
                        <div>
                        <Text 
                        size="xl" 
                        fw={500}
                        td={todo.completed ? 'line-through' : 'none'}>
                            {todo.taskTitle}
                        </Text>
                        
                        <Text 
                        size="sm" 
                        td={todo.completed ? 'line-through' : 'none'}>
                            {todo.taskDescription}
                        </Text>
                        </div>
                        <Badge 
                            mt="sm"
                            px="md"
                            py={4}
                            ml="auto"
                            color={todo.completed? 'green':'yellow'}>{todo.completed ? 'Completed' : 'Not Completed'}</Badge>
                            </Group>
                    </Checkbox.Card>
                    <Button variant="light" color="red" onClick={()=>deleteTodoTask(todo.id)}>Delete</Button>
                    </Group>
                    
                ))}
                </Stack>
            </ul>

        
    </ScrollArea.Autosize>
    </Container>
    </Stack>
    </>

  );
};

export default TodoList;
