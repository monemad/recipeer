import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { editUser } from '../../store/session';

const EditUserForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
	const [imgFile, setImgFile] = useState("")
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onEditUser = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(editUser(firstName, lastName, username, password, imgFile, user.id));
            if (data) {
                setErrors(data)
            } else {
                setShowModal(false)
            }
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
            <div>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
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
			</div>
			<div>
                <label>Last Name</label>
                <input
                    type='text'
                    name='last_name'
                    onChange={updateLastName}
                    value={lastName}
                />
			</div>
			<div>
                <label>User Name</label>
                <input
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                />
            </div>
            <div>
                <label>New Password</label>
                <input
                    type='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                />
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
