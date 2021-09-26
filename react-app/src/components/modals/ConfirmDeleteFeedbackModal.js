import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDeleteFeedback from '../FeedbackComponents/ConfirmDeleteFeedback';

function ConfirmDeleteFeedbackModal({ feedbackId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Delete</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="confirm-delete-modal">
                <ConfirmDeleteFeedback setShowModal={setShowModal} feedbackId={feedbackId}/>
            </Modal>
        )}
        </>
    );
}

export default ConfirmDeleteFeedbackModal;
