import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Login</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="login-modal">
                <LoginForm setShowModal={setShowModal}/>
            </Modal>
        )}
        </>
    );
}

export default LoginFormModal;
