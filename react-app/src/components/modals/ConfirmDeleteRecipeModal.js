import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDeleteRecipe from '../RecipeComponents/ConfirmDeleteRecipe';

function ConfirmDeleteRecipeModal({ recipeId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button type='button' onClick={() => setShowModal(true)}>Delete Recipe</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="confirm-delete-modal">
                <ConfirmDeleteRecipe setShowModal={setShowModal} recipeId={recipeId}/>
            </Modal>
        )}
        </>
    );
}

export default ConfirmDeleteRecipeModal;
