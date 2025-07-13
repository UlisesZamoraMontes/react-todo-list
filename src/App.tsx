import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <TodoList/>

    </MantineProvider>

  );
}
