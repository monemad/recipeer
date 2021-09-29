import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditInstructionForm from '../RecipeComponents/EditInstructionForm';

function EditInstructionFormModal({ instruction }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <i className="edit-instruction fas fa-pencil-alt" onClick={() => setShowModal(true)}></i>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="edit-instruction-modal">
                <EditInstructionForm setShowModal={setShowModal} instruction={instruction}/>
            </Modal>
        )}
        </>
    );
}

export default EditInstructionFormModal;
