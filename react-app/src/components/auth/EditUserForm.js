import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { editUser } from '../../store/session';

const EditUserForm = ({ setShowModal }) => {
    const user = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
	const [imgFile, setImgFile] = useState("")
    const dispatch = useDispatch();

    const firstNameErrors = errors.filter(error => error.startsWith('first_name')).map(error => error.slice(13))
    const lastNameErrors = errors.filter(error => error.startsWith('last_name')).map(error => error.slice(12))
    const usernameErrors = errors.filter(error => error.startsWith('username')).map(error => error.slice(11))
    const passwordErrors = errors.filter(error => error.startsWith('password')).map(error => error.slice(11))
    const otherErrors = errors.filter(error => error.startsWith('other')).map(error => error.slice(8))

    const onEditUser = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(editUser(firstName, lastName, username, password, imgFile, user.id));
            if (data) {
                setErrors(data)
            } else {
                setShowModal(false)
            }
        } else {
            setErrors(['other : Passwords do not match'])
        }
    };

    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const updateLastName = (e) => {
        setLastName(e.target.value);
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
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

    return (
        <form onSubmit={onEditUser}>
            <div className='errors'>
                {otherErrors.map((error, ind) => (
                <span key={ind}>{error}</span>
                ))}
            </div>
            <div>
                <label>First Name</label>
                <input
                    type='text'
                    name='first_name'
                    onChange={updateFirstName}
                    value={firstName}
                />
                <div className='errors'>
                    {firstNameErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
			</div>
			<div>
                <label>Last Name</label>
                <input
                    type='text'
                    name='last_name'
                    onChange={updateLastName}
                    value={lastName}
                />
                <div className='errors'>
                    {lastNameErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
			</div>
			<div>
                <label>User Name</label>
                <input
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                />
                <div className='errors'>
                    {usernameErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
            </div>
            <div>
                <label>New Password</label>
                <input
                    type='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                />
                <div className='errors'>
                    {passwordErrors.map((error, ind) => (
                    <span key={ind}>{error}</span>
                    ))}
                </div>
            </div>
            <div>
                <label>Repeat Password</label>
                <input
                    type='password'
                    name='repeat_password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                />
            </div>
			<div>
                <label>Profile Image</label>
                <input
                type='file'
                name='imgFile'
                onChange={updateImgFile}
                required={false}
                ></input>
            </div>
            <button type='submit'>Confirm</button>
        </form>
    );
};

export default EditUserForm;
