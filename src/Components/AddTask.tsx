import React, { FormEvent, useState } from 'react'
import { TaskItem } from './Task';

interface AddTaskProps {
    onAddTask: (task: TaskItem) => void,
}

export const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onAddTask({ id: Math.random() * 10000, title, desc });
      setTitle('');
      setDesc('');
    };

    return (
    <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                 New Task
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onFormSubmit} id="addTaskForm">
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
                type="submit" form="addTaskForm"
                className="btn btn-primary" data-bs-dismiss="modal">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}