import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
	const [imgFile, setImgFile] = useState("")
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const firstNameErrors = errors.filter(error => error.startsWith('first_name')).map(error => error.slice(13))
    const lastNameErrors = errors.filter(error => error.startsWith('last_name')).map(error => error.slice(12))
    const usernameErrors = errors.filter(error => error.startsWith('username')).map(error => error.slice(11))
    const emailErrors = errors.filter(error => error.startsWith('email')).map(error => error.slice(8))
    const passwordErrors = errors.filter(error => error.startsWith('password')).map(error => error.slice(11))
    const otherErrors = errors.filter(error => error.startsWith('other')).map(error => error.slice(8))

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(firstName, lastName, username, email, password, imgFile));
            if (data) {
                setErrors(data)
            } else {
                setShowModal(false)
            }
        } else {
            setErrors(['other : Passwords do not match'])
        }
    }

    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const updateLastName = (e) => {
        setLastName(e.target.value);
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

	const updateImgFile = (e) => {
        const file = e.target.files[0]
        setImgFile(file);
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <form onSubmit={onSignUp} autoComplete='on'>
            <div className='errors'>
                {otherErrors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <input
                    type='text'
                    name='first_name'
                    placeholder='First Name'
                    onChange={updateFirstName}
                    value={firstName}
                    maxLength={50}
                />
                <div className='errors'>
                    {firstNameErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
			</div>
			<div>
                <input
                    type='text'
                    name='last_name'
                    placeholder='Last Name'
                    onChange={updateLastName}
                    value={lastName}
                    maxLength={50}
                />
                <div className='errors'>
                    {lastNameErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
			</div>
			<div>
                <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={updateUsername}
                    value={username}
                    maxLength={40}
                />
                <div className='errors'>
                    {usernameErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
            </div>
            <div>
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    onChange={updateEmail}
                    value={email}
                    maxLength={255}
                />
                <div className='errors'>
                    {emailErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
            </div>
            <div>
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={updatePassword}
                    value={password}
                    maxLength={50}
                />
                <div className='errors'>
                    {passwordErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
            </div>
            <div>
                <input
                    type='password'
                    name='repeat_password'
                    placeholder='Confirm Password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                    maxLength={50}
                />
            </div>
			<div>
                <label>Profile Picture</label>
                <input
                className='upload-img'
                type='file'
                name='imgFile'
                onChange={updateImgFile}
                required={false}
                ></input>
            </div>
            <button type='submit'>Sign Up</button>
        </form>
    );
};

export default SignUpForm;
