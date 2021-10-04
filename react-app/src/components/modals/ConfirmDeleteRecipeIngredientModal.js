import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDeleteRecipeIngredient from '../RecipeComponents/ConfirmDeleteRecipeIngredient';

function ConfirmDeleteRecipeIngredientModal({ recipeIngredientId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button className='delete-btn' onClick={() => setShowModal(true)}>Delete</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="confirm-delete-modal">
                <ConfirmDeleteRecipeIngredient setShowModal={setShowModal} recipeIngredientId={recipeIngredientId}/>
            </Modal>
        )}
        </>
    );
}

export default ConfirmDeleteRecipeIngredientModal;
