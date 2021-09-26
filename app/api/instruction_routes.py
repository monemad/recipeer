from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Recipe, Instruction

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
