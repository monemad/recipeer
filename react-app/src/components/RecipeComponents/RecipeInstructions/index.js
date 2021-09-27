import React from 'react'

function RecipeInstructions({ recipe, pictureObj, authorized }) {

    return (
        <div className='recipe-instructions'>
            <h2>Instructions</h2>
            <ol>
                {recipe.instructions.map(ins => 
                    <div key={ins.id}>
                        <li>{ins.step}</li>
                        { pictureObj[ins.order] && <img className='instruction-img' src={pictureObj[ins.order]} alt={ins.order}/>}
                    </div>
                )}
            </ol>
            { authorized && 
                <button>Add instruction</button>
            }
        </div>
    )
}

export default RecipeInstructions
