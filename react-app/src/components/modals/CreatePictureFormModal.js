import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePictureForm from '../RecipeComponents/CreatePictureForm';

function CreatePictureFormModal({ recipe, order }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>📷</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="create-picture-form-modal">
                <CreatePictureForm setShowModal={setShowModal} recipe={recipe} order={order}/>
            </Modal>
        )}
        </>
    );
}

export default CreatePictureFormModal;
