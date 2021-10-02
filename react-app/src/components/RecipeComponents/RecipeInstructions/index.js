import React, { useState } from 'react'
import ConfirmDeletePictureModal from '../../modals/ConfirmDeletePictureModal'
import CreateInstructionFormModal from '../../modals/CreateInstructionFormModal'
import CreatePictureFormModal from '../../modals/CreatePictureFormModal'
import EditInstructionFormModal from '../../modals/EditInstructionFormModal'
import ImageModal from '../../modals/ImageModal'

function RecipeInstructions({ recipe, pictureObj, authorized }) {
    const [showImageModal, setShowImageModal] = useState(false)
    const [modalImageOrder, setModalImageOrder] = useState(0)

    const handleImageClick = e => {
        setModalImageOrder(+e.target.id)
        setShowImageModal(true)
    }

    return (
        <div className='recipe-instructions'>
            {recipe.instructions.map((ins, idx) => 
                <div key={ins.id} className='instruction'>
                    <div className='instruction-text'>
                        <div className='instruction-step-header'>
                            <h2 className='header'>{idx + 1}</h2>
                            { authorized && 
                                <>
                                    <EditInstructionFormModal instruction={ins} />
                                    {/* <ConfirmDeleteInstructionModal instructionId={ins.id} /> */}
                                </>
                            }
                        </div>
                        <p>{ins.step}</p>
                    </div>
                    <div className='recipe-picture-div instruction-picture-div'>
                    { pictureObj[ins.order] ? 
                            <>
                                <img id={ins.order} className='instruction-picture' onClick={handleImageClick} src={pictureObj[ins.order].imgUrl} alt={ins.order} />
                                { showImageModal && modalImageOrder === ins.order && <ImageModal imgUrl={pictureObj[ins.order].imgUrl} showModal={showImageModal} setShowModal={setShowImageModal}/>}
                                {authorized && <ConfirmDeletePictureModal pictureId={pictureObj[ins.order].id} />}
                            </>
                            :
                            authorized && 
                            <>
                                <p>Upload a picture for Step {idx+1}!</p>
                                <CreatePictureFormModal recipe={recipe} order={ins.order}/>
                            </>
                        }
                    </div>
                </div>
            )}
            { authorized && 
                <CreateInstructionFormModal recipe={recipe} />
            }
        </div>
    )
}

export default RecipeInstructions
