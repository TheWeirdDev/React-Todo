import React from 'react'
import { Task, TaskItem } from './Task';
import { ListGroup } from 'react-bootstrap';

interface TasksProps {
    tasks: TaskItem[],
    onDelete: (id: number) => void,
    onEditTask: (task: TaskItem) => void;
}

export const Tasks: React.FC<TasksProps> = ({ tasks, onDelete, onEditTask}) => {

    return (
        <div className="card-body">
            <ListGroup className="list-group-flush">
                {   tasks.length > 0 ?
                    tasks.map(task => (
                        <Task key={task.id} onDelete={onDelete} onEdit={onEditTask} task={task} />
                    ))
                    :
                    <div className="alert alert-info mb-0">
                        There are no tasks
                    </div>
                }
            </ListGroup>
        </div>);
}