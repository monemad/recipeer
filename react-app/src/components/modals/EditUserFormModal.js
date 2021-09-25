import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditUserForm from '../auth/EditUserForm';

function EditUserFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Edit</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="signup-modal">
                <EditUserForm setShowModal={setShowModal}/>
            </Modal>
        )}
        </>
    );
}

export default EditUserFormModal;
