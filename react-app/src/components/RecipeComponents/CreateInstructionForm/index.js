import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createInstruction } from '../../../store/recipes'

function CreateInstructionForm({ setShowModal, recipe }) {
    const dispatch = useDispatch()
    const [step, setStep] = useState('')

    const updateStep = e => {
        setStep(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const order = recipe.instructions[recipe.instructions.length-1].order + 1
        const instruction = {
            recipeId: recipe.id,
            step,
            order
        }
        console.log(instruction)
        await dispatch(createInstruction(instruction))
        setShowModal(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        value={step}
                        onChange={updateStep}
                        required
                    />
                </div>
                <button>Add Instruction</button>
                <button type='button' onClick={e => setShowModal(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default CreateInstructionForm
