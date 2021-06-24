import './App.css';
import { EditTask } from './Components/EditTask';
import { Header } from './Components/Header';
import { Tasks } from './Components/Tasks';
import { TaskItem } from './Components/Task';
import { useState, useEffect } from 'react';
import { AddTask } from './Components/AddTask';

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [taskToEdit, setTaskToEdit] = useState<TaskItem>({ id: 0, title: '', desc: '' });

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const setAndSaveTasks = (newTasks: TaskItem[]) => {
    const tasksJson = JSON.stringify(newTasks);
    localStorage.setItem('tasks', tasksJson);
    setTasks(newTasks);
  }

  const addTask = (task: TaskItem) => {
    setAndSaveTasks([...tasks, task]);
  }

  const selectEditTask = (task: TaskItem) => {
    setTaskToEdit(task);
  }

  const editTask = (task: TaskItem) => {
    const newTasks = [...tasks];
    const index = newTasks.findIndex(t => t.id === task.id);
    newTasks[index] = task;
    setAndSaveTasks(newTasks);
  }

  const deleteTask = (id: number) => {
    setAndSaveTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div className="container col-lg-6 col-md-8 col-sm-10 ">
      <div className="card mt-3 mx-2">
        <Header name='ali'/>
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onEditTask={selectEditTask} /> :
          <div className="alert alert-info mb-0">
            There are no tasks
          </div>}
      </div>
      <AddTask onAddTask={addTask} />
      <EditTask onEditTask={editTask} task={taskToEdit} />
    </div>

  );
}

export default App;
