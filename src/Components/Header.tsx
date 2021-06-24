import React from 'react'

interface HeaderProps {
    name: string
}

export const Header: React.FC<HeaderProps> = ({name}) => {
    return (
        <header className="card-header d-flex justify-content-between align-items-center p-3">
            <strong className="">Tasks</strong>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Task</button>
        </header>
        );
}