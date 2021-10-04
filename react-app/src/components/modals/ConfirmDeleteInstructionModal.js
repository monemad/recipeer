import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDeleteInstruction from '../RecipeComponents/ConfirmDeleteInstruction';

function ConfirmDeleteInstructionModal({ instructionId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button className='delete-btn' onClick={() => setShowModal(true)}>Delete</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="confirm-delete-modal">
                <ConfirmDeleteInstruction setShowModal={setShowModal} instructionId={instructionId}/>
            </Modal>
        )}
        </>
    );
}

export default ConfirmDeleteInstructionModal;
