import React from 'react'
import { Task, TaskItem } from './Task';

interface TasksProps {
    tasks: TaskItem[],
    onDelete: (id: number) => void,
    onEditTask: (task: TaskItem) => void;
}

export const Tasks: React.FC<TasksProps> = ({ tasks, onDelete, onEditTask}) => {

    return (
        <div className="card-body">
            <ol className="list-group list-group-flush">
                {
                    tasks.map(task => (
                        <Task key={task.id} onDelete={onDelete} onEdit={onEditTask} task={task} />
                    ))
                }
            </ol>
        </div>);
}