import React from 'react'

interface HeaderProps {
    title: string,
    showButton: boolean
}

export const Header: React.FC<HeaderProps> = ({ title, showButton }) => {
    return (
        <header className="card-header d-flex justify-content-between align-items-center p-3">
            <h4 className="card-title ">{title}</h4>
            {showButton &&
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Task</button>
            }
            </header>
        );
}