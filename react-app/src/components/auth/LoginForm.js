import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const emailErrors = errors.filter(error => error.startsWith('email')).map(error => error.slice(8))
    const passwordErrors = errors.filter(error => error.startsWith('password')).map(error => error.slice(11))

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        } else {
            setShowModal(false);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <form onSubmit={onLogin} autoComplete='on'>
            <div>
                <input
                    name='email'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                />
                <div className='errors'>
                    {emailErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
            </div>
            <div>
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                />
                <div className='errors'>
                    {passwordErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
            </div>
            <button type='submit'>Login</button>
        </form>
    );
};

export default LoginForm;
