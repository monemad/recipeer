import React from 'react'
import ConfirmDeleteInstructionModal from '../../modals/ConfirmDeleteInstructionModal'
import ConfirmDeletePictureModal from '../../modals/ConfirmDeletePictureModal'
import CreateInstructionFormModal from '../../modals/CreateInstructionFormModal'
import CreatePictureFormModal from '../../modals/CreatePictureFormModal'
import EditInstructionFormModal from '../../modals/EditInstructionFormModal'

function RecipeInstructions({ recipe, pictureObj, authorized }) {

    return (
        <div className='recipe-instructions'>
            <h2>Instructions</h2>
            <ol>
                {recipe.instructions.map(ins => 
                    <div key={ins.id}>
                        <li>
                            <div>
                                {ins.step}
                                { authorized && 
                                    <>
                                        <EditInstructionFormModal instruction={ins} />
                                        <ConfirmDeleteInstructionModal instructionId={ins.id} />
                                    </>
                                }
                            </div>
                        </li>
                        { pictureObj[ins.order] ? 
                            <div className='recipe-picture-div'>
                                <img className='instruction-picture' src={pictureObj[ins.order].imgUrl} alt={ins.order}/>
                                {authorized && <ConfirmDeletePictureModal pictureId={pictureObj[ins.order].id} />}
                            </div>
                            :
                            authorized && <CreatePictureFormModal recipe={recipe} order={ins.order}/>
                        }
                    </div>
                )}
            </ol>
            { authorized && 
                <CreateInstructionFormModal recipe={recipe} />
            }
        </div>
    )
}

export default RecipeInstructions
