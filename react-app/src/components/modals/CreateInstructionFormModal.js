import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateInstructionForm from '../RecipeComponents/CreateInstructionForm';

function CreateInstructionFormModal({ recipe }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Add Instruction</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="create-instruction-modal">
                <CreateInstructionForm setShowModal={setShowModal} recipe={recipe}/>
            </Modal>
        )}
        </>
    );
}

export default CreateInstructionFormModal;
