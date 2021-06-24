import React, { FormEvent, useEffect, useState } from 'react'
import { TaskItem } from './Task';

interface EditTaskProps {
    task: TaskItem,
    onEditTask: (task: TaskItem) => void;
}

export const EditTask: React.FC<EditTaskProps> = ({ task, onEditTask }) => {
    const [title, setTitle] = useState(task.title);
    const [desc, setDesc] = useState(task.desc);

    useEffect(() => {
        setTitle(task.title);
        setDesc(task.desc);
    }, [task])

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onEditTask({ id: task.id, title, desc });
      setTitle('');
      setDesc('');
    };

    return (
    <div className="modal fade" id="editTaskModal" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">
                Edit Task
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onFormSubmit} id="editTaskForm">
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                    <input type="text" className="form-control" id="task-title"
                        onChange={e => setTitle(e.target.value)} value={title}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Description:</label>
                    <textarea className="form-control" id="task-desc"
                    onChange={e => setDesc(e.target.value)} value={desc}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button
                type="submit" form="editTaskForm"
                className="btn btn-primary" data-bs-dismiss="modal">
                    Edit
                </button>
            </div>
          </div>
        </div>
      </div>
    );
}