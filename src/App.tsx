import './App.css';
import { EditTask } from './Components/EditTask';
import { Header } from './Components/Header';
import { Tasks } from './Components/Tasks';
import { TaskItem } from './Components/Task';
import { Login } from './Components/Login';
import { useState, useEffect } from 'react';
import { AddTask } from './Components/AddTask';
import { Card, Spinner } from 'react-bootstrap';
import { LoginResult, Jwt, refreshAccess, getTasks, addTask, removeTask, updateTask } from './Service';
import { isExpired } from 'react-jwt';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [taskToEdit, setTaskToEdit] = useState<TaskItem>({ id: 0, title: '', desc: '' });

  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let access = localStorage.getItem('access_token');
  let refresh = localStorage.getItem('refresh_token');

  const saveJwt = (res: Jwt) => {
    localStorage.setItem('access_token', res.access);
    localStorage.setItem('refresh_token', res.refresh);
    access = res.access;
    refresh = res.refresh;
  }

  useEffect(() => {
    (async () => {

    if (access != null && refresh != null) {
      if (isExpired(access)) {
        const res = await refreshAccess(refresh);
        if (res.success) {
          localStorage.setItem('access_token', res.data);
          setIsLoggedIn(true);
        } else {
          console.log(res.error);
        }
      } else {
        setIsLoggedIn(true);
      }
    }
  })();
  });

  useEffect(() => {
    (async () => {
      if (isLoggedIn && access) {
        const res = await getTasks(access);
        if (res.success) {
          setTasks(res.data);
          setLoading(false);
        }
      }
    })();
  }, [access, isLoggedIn]);


  const setLoginStatus = (res: LoginResult) => {
    if (res.success) {
      saveJwt(res.data!);
    } else {
      console.log(res.error);
    }
    setIsLoggedIn(res.success);
  };

  const addTaskItem = async (task: TaskItem) => {
    if (isLoggedIn && access) {
      const res = await addTask(access, task);
      if (res.success) {
        task.id = res.data.id;
        setTasks([...tasks, task]);
      }
    }
  }

  const selectEditTask = (task: TaskItem) => {
    setTaskToEdit(task);
  }

  const editTask = async (task: TaskItem) => {
      if (isLoggedIn && access) {
      const res = await updateTask(access, task);
      if (res.success) {
        const newTasks = [...tasks];
        const index = newTasks.findIndex(t => t.id === task.id);
        newTasks[index] = res.data;
        setTasks(newTasks);
      }
    }
  }

  const deleteTask = async (id: number) => {
    if (isLoggedIn && access) {
      const res = await removeTask(access, id);
      if (res.success) {
        setTasks(tasks.filter(t => t.id !== id));
      }
    }
  }


  return (
    <div className="container col-lg-6 col-md-8 col-sm-10 ">
      <Card className="mt-3 mx-2">
        {
          isLoggedIn ? (
            <>
              <Header title="Projects" showButton={true} />
              {
                isLoading ?
                <Spinner animation="grow" variant="primary" className="mx-auto my-4" />
                :
                <Tasks tasks={tasks} onDelete={deleteTask} onEditTask={selectEditTask} />
              }
            </>
          ) : (
              <>
                <Header title="Login" showButton={false} />
                <Login onLoginStateChange={setLoginStatus}/>
              </>
          )
       }
      </Card>
      <AddTask onAddTask={addTaskItem} />
      <EditTask onEditTask={editTask} task={taskToEdit} />
    </div>

  );
}

export default App;
