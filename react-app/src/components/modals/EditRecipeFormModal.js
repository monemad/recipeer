import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditRecipeForm from '../RecipeComponents/EditRecipeForm';

function EditRecipeFormModal({ recipe }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Edit/Delete Recipe</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="create-recipe-form-modal">
                <EditRecipeForm setShowModal={setShowModal} recipe={recipe}/>
            </Modal>
        )}
        </>
    );
}

export default EditRecipeFormModal;
