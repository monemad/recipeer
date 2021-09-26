import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateRecipeForm from '../RecipeComponents/CreateRecipeForm';

function RecipeFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Create Recipe</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="create-recipe-form-modal">
                <CreateRecipeForm setShowModal={setShowModal}/>
            </Modal>
        )}
        </>
    );
}

export default RecipeFormModal;
