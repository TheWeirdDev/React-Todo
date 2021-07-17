import { TaskItem } from './Components/Task';

export interface Jwt {
    access: string;
    refresh: string;
}
export interface LoginResult {
    success: boolean;
    data?: Jwt;
    error?: string;
}

const request = async (path: string, method: string, access: string, body?: any) => {
    const response = await fetch(path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
            'Accept': 'application/json',
        },
        body: body && JSON.stringify(body),
    });
    return response;
};

const login = async (username: string, password: string) => {
    let res: LoginResult;
    const response = await fetch(`/api/v1/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    const data = await response.json();
    if (response.status === 404) {
        res = { success: false, error: data.detail };
    } else if (response.status !== 200) {
        res = { success: false, error: "Unknown error" };
    } else {
        res = { success: true, data: data };
    }
    return res;
};

const refreshAccess = async (refresh: string) => {
    const response = await fetch(`/api/v1/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh
        }),
    });
    const data = await response.json();
    let res;
    if (response.status === 401 || response.status === 404) {
        res = { success: false, error: data.detail };
    } else if (response.status !== 200) {
        res = { success: false, error: "Unknown error" };
    } else {
        res = { success: true, data: data.access };
    }
    return res;
};

const getTasks = async (access: string) => {
    const response = await request(`/api/v1/tasks/`, 'GET', access);
    const data = await response.json();
    if (response.status !== 200) {
        return { success: false, error: data.detail };
    }
    return { success: true, data };
}

const addTask = async (access: string, task: TaskItem) => {
    const response = await request(`/api/v1/tasks/`, 'POST', access, {
        title: task.title,
        desc: task.desc,
        done: false,
    });

    const data = await response.json();
    if (response.status !== 201) {
        return { success: false, error: data.detail };
    }
    return { success: true, data };
}

const removeTask = async (access: string, task_id: number) => {
    const response = await request(`/api/v1/tasks/${task_id}/`, 'DELETE', access);
    if (response.status !== 204) {
        const data = await response.json();
        return { success: false, error: data.detail };
    }
    return { success: true };
}

const updateTask = async (access: string, task: TaskItem) => {
    const response = await request(`/api/v1/tasks/${task.id}/`, 'PUT', access, {
        title: task.title,
        desc: task.desc,
        done: false,
    });
    const data = await response.json();
    if (response.status !== 200) {
        return { success: false, error: data.detail };
    }
    return { success: true, data };
}
export { login, refreshAccess, getTasks, addTask, removeTask, updateTask };