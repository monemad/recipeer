import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateRecipeIngredientForm from '../RecipeComponents/CreateRecipeIngredientForm';

function CreateRecipeIngredientFormModal({ recipe }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Add Ingredient</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="create-ingredient-modal">
                <CreateRecipeIngredientForm setShowModal={setShowModal} recipe={recipe}/>
            </Modal>
        )}
        </>
    );
}

export default CreateRecipeIngredientFormModal;
