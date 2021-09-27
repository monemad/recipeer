from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Recipe, RecipeIngredient

recipe_ingredient_routes = Blueprint('recipe-ingredients', __name__)

@recipe_ingredient_routes.route('/', methods=['POST'])
@login_required
def create_recipe_ingredient():
    data = request.get_json()
    order = data['order']
    quantity = data['quantity']
    ingredient_id = data['ingredient_id']
    unit_id = data['unit_id']
    recipe_id = data['recipe_id']

    new_recipe_ingredient = RecipeIngredient(order=order, quantity=quantity, ingredient_id=ingredient_id, unit_id=unit_id, recipe_id=recipe_id)
    db.session.add(new_recipe_ingredient)
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_id)
    return updated_recipe.to_dict()


@recipe_ingredient_routes.route('/<int:id>/', methods=['PUT'])
@login_required
def edit_recipe_ingredient(id):
    data = request.get_json()
    quantity = data['quantity']
    ingredient_id = data['ingredient_id']
    unit_id = data['unit_id']

    recipe_ingredient = RecipeIngredient.query.get(id)
    recipe_ingredient.quantity = quantity
    recipe_ingredient.ingredient_id = ingredient_id
    recipe_ingredient.unit_id = unit_id
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_ingredient.recipe_id)
    return updated_recipe.to_dict()


@recipe_ingredient_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_recipe_ingredient(id):
    recipe_ingredient = RecipeIngredient.query.get(id)
    recipe_id = recipe_ingredient.recipe_id
    db.session.delete(recipe_ingredient)
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_id)
    return updated_recipe.to_dict()
