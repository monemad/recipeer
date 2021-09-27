import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDeletePicture from '../RecipeComponents/ConfirmDeletePicture';

function ConfirmDeletePictureModal({ pictureId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Delete</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="confirm-delete-modal">
                <ConfirmDeletePicture setShowModal={setShowModal} pictureId={pictureId}/>
            </Modal>
        )}
        </>
    );
}

export default ConfirmDeletePictureModal;
