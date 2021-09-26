import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditFeedbackForm from '../FeedbackComponents/EditFeedbackForm';

function EditFeedbackFormModal({ feedback }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Edit</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="edit-feedback-modal">
                <EditFeedbackForm setShowModal={setShowModal} feedback={feedback}/>
            </Modal>
        )}
        </>
    );
}

export default EditFeedbackFormModal;
