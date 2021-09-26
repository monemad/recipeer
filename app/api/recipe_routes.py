from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Recipe, RecipeIngredient, Instruction, recipe_attribute_joins_table, recipe_type_joins_table

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route('/')
def recipes():
    recipes = Recipe.query.all()
    return {'recipes': [recipe.to_dict() for recipe in recipes]}


@recipe_routes.route('/<int:id>')
def recipe(id):
    recipe = Recipe.query.get(id)
    return recipe.to_dict()

@recipe_routes.route('/', methods=['POST'])
@login_required
def create_recipe():
    data = request.get_json()
    title = data['title']
    difficulty = data['difficulty']
    cook_time = data['cook_time']
    user_id = data['user_id']
    new_recipe = Recipe(title=title, difficulty=difficulty, cook_time=cook_time, user_id=user_id)
    db.session.add(new_recipe)
    db.session.commit()
    return new_recipe.to_dict()

@recipe_routes.route('/<int:recipe_id>/ingredients/', methods=['POST'])
@login_required
def create_recipe_ingredient(recipe_id):
    data = request.get_json()
    order = data['order']
    quantity = data['quantity']
    ingredient_id = data['ingredient_id']
    unit_id = data['unit_id']

    new_recipe_ingredient = RecipeIngredient(order=order, quantity=quantity, ingredient_id=ingredient_id, unit_id=unit_id, recipe_id=recipe_id)
    db.session.add(new_recipe_ingredient)
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_id)
    return updated_recipe.to_dict()

@recipe_routes.route('/<int:recipe_id>/instructions/', methods=['POST'])
@login_required
def create_instruction(recipe_id):
    data = request.get_json()
    order = data['order']
    step = data['step']

    new_instruction = Instruction(order=order, step=step, recipe_id=recipe_id)
    db.session.add(new_instruction)
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_id)
    return updated_recipe.to_dict()

@recipe_routes.route('/<int:recipe_id>/attributes/', methods=['POST'])
@login_required
def create_recipe_attribute_join(recipe_id):
    data = request.get_json()
    attribute_id = data['attribute_id']

    db.session.execute(recipe_attribute_joins_table.insert().values(attribute_id=attribute_id, recipe_id=recipe_id))
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_id)
    return updated_recipe.to_dict()

@recipe_routes.route('/<int:recipe_id>/types/', methods=['POST'])
@login_required
def create_recipe_type_join(recipe_id):
    data = request.get_json()
    type_id = data['type_id']

    db.session.execute(recipe_type_joins_table.insert().values(type_id=type_id, recipe_id=recipe_id))
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_id)
    return updated_recipe.to_dict()
