import React from 'react'

export interface TaskItem {
    id: number,
    title: string,
    desc: string,
}

interface TaskProps {
    task: TaskItem,
    onDelete: (id: number) => void,
    onEdit: (task: TaskItem) => void;
}

export const Task: React.FC<TaskProps> = ({task, onDelete, onEdit}) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{task.title}</div>
                {task.desc}
            </div>
            <button
                className="btn btn-outline-primary m-2" data-bs-toggle="modal"
                data-bs-target="#editTaskModal" onClick={() => onEdit(task)}>
                Edit
            </button>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => onDelete(task.id)}></button>
        </li>

        );
}