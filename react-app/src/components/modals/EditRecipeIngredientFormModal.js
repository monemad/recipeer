import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditRecipeIngredientForm from '../RecipeComponents/EditRecipeIngredientForm';

function EditRecipeIngredientFormModal({ recipeIngredient }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <i className="edit-ingredient fas fa-pencil-alt" onClick={() => setShowModal(true)}></i>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="edit-ingredient-modal">
                <EditRecipeIngredientForm setShowModal={setShowModal} recipeIngredient={recipeIngredient}/>
            </Modal>
        )}
        </>
    );
}

export default EditRecipeIngredientFormModal;
