import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import RecipeForm from '../RecipeForm';

function RecipeFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Create Recipe</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="recipe-form-modal">
                <RecipeForm setShowModal={setShowModal}/>
            </Modal>
        )}
        </>
    );
}

export default RecipeFormModal;
