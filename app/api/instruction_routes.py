from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Recipe, Instruction, Picture

instruction_routes = Blueprint('instructions', __name__)


@instruction_routes.route('/', methods=['POST'])
@login_required
def create_instruction():
    data = request.get_json()
    order = data['order']
    step = data['step']
    recipe_id = data['recipe_id']

    new_instruction = Instruction(order=order, step=step, recipe_id=recipe_id)
    db.session.add(new_instruction)
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_id)
    return updated_recipe.to_dict()


@instruction_routes.route('/<int:id>/', methods=['PUT'])
@login_required
def edit_instruction(id):
    data = request.get_json()
    step = data['step']

    instruction = Instruction.query.get(id)
    instruction.step = step
    db.session.commit()
    updated_recipe = Recipe.query.get(instruction.recipe_id)
    return updated_recipe.to_dict()


@instruction_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_instruction(id):
    instruction = Instruction.query.get(id)
    recipe_id = instruction.recipe_id
    order = instruction.order
    picture = Picture.query.filter(Picture.recipe_id == recipe_id, Picture.order == order).first()
    db.session.delete(picture)
    db.session.delete(instruction)
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_id)
    return updated_recipe.to_dict()
