import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteInstruction } from '../../../store/recipes'

function ConfirmDeleteInstruction({ setShowModal, instructionId }) {
    const dispatch = useDispatch()

    const handleDelete = e => {
        dispatch(deleteInstruction(instructionId))
        setShowModal(false)
    }

    return (
        <div>
            <button onClick={handleDelete}>Delete instruction?</button>
            <button onClick={e => setShowModal(false)}>Cancel</button>
        </div>
    )
}

export default ConfirmDeleteInstruction
