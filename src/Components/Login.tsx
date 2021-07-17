import React, { FormEvent, useState } from 'react'
import { Form, Button, FormLabel } from 'react-bootstrap';

import { login, LoginResult } from '../Service';

interface LoginProps {
    onLoginStateChange: (res: LoginResult) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginStateChange }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLoginFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await login(username, password);
        if (res.success) {
            setUsername('');
            setPassword('');
            onLoginStateChange(res);
        } else {
            onLoginStateChange(res);
        }
    };
    return (
        <Form className="m-3 px-5 py-2" onSubmit={onLoginFormSubmit}>
            <div className="mb-3">
                <FormLabel htmlFor="username" className="form-label">Username</FormLabel>
                <input type="text" className="form-control" id="username"
                   onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
                <FormLabel htmlFor="password" className="form-label">Password</FormLabel>
                <input type="password" className="form-control" id="password"
                    onChange={e => setPassword(e.target.value)}/>
            </div>
            <Button type="submit" className="btn btn-primary">Login</Button>
        </Form>
    );
}