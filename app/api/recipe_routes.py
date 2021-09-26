from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Recipe, RecipeIngredient, Instruction, recipe_attribute_joins_table, recipe_type_joins_table

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route('/')
def recipes():
    recipes = Recipe.query.all()
    return {'recipes': [recipe.to_dict() for recipe in recipes]}


@recipe_routes.route('/<int:id>/')
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

@recipe_routes.route('/<int:id>/', methods=['DELETE'])
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    recipe.attributes.clear()
    recipe.types.clear()
    db.session.delete(recipe)
    db.session.commit()
    return {'message': 'Successfully deleted!'}


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
