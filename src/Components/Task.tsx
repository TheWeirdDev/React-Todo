import React from 'react'
import { Button, ListGroupItem } from 'react-bootstrap';

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
        <ListGroupItem className="d-flex justify-content-between align-items-center">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{task.title}</div>
                {task.desc}
            </div>
            <Button variant="outline-primary"
                className="m-2" data-bs-toggle="modal"
                data-bs-target="#editTaskModal" onClick={() => onEdit(task)}>
                Edit
            </Button>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => onDelete(task.id)}></button>
        </ListGroupItem>

        );
}