import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editInstruction } from '../../../store/recipes'
import ConfirmDeleteInstructionModal from '../../modals/ConfirmDeleteInstructionModal';

function EditInstructionForm({ setShowModal, instruction }) {
    const dispatch = useDispatch()
    const [step, setStep] = useState(instruction.step)

    const updateStep = e => {
        setStep(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const edit = {
            instructionId: instruction.id,
            step
        }
        await dispatch(editInstruction(edit))
        setShowModal(false)
    }

    return (
        <div className='edit-instruction-div'>
            <form className='edit-instruction-form' onSubmit={handleSubmit}>
                <div className='input-instruction-div'>
                    <textarea
                        value={step}
                        onChange={updateStep}
                        required
                        maxLength={500}
                    />
                </div>
                <div className='form-buttons'>
                    <button>Edit</button>
                    <button className='cancel-btn' type='button' onClick={e => setShowModal(false)}>Cancel</button>
                </div>
            </form>
            <ConfirmDeleteInstructionModal instructionId={instruction.id} />
        </div>
    )
}

export default EditInstructionForm
