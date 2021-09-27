import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditRecipeIngredientForm from '../RecipeComponents/EditRecipeIngredientForm';

function EditRecipeIngredientFormModal({ recipeIngredient }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>🖊</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="edit-ingredient-modal">
                <EditRecipeIngredientForm setShowModal={setShowModal} recipeIngredient={recipeIngredient}/>
            </Modal>
        )}
        </>
    );
}

export default EditRecipeIngredientFormModal;
