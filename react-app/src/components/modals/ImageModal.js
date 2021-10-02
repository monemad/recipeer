import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

function ImageModal({ imgUrl, showModal, setShowModal }) {

    return (
        <>
        {showModal && (
            <Modal onClose={() => setShowModal(false)} className="image-modal">
                <div className='modal-image-div'>
                    <img className='modal-image' src={imgUrl} alt={imgUrl} />
                </div>
            </Modal>
        )}
        </>
    );
}

export default ImageModal;
