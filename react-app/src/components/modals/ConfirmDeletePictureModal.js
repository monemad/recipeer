import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDeletePicture from '../RecipeComponents/ConfirmDeletePicture';

function ConfirmDeletePictureModal({ pictureId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <i className='delete-picture fas fa-trash-alt' onClick={() => setShowModal(true)}></i>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="confirm-delete-modal">
                <ConfirmDeletePicture setShowModal={setShowModal} pictureId={pictureId}/>
            </Modal>
        )}
        </>
    );
}

export default ConfirmDeletePictureModal;
