from flask import Blueprint
from flask_login import login_required
from app.models import Recipe

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route('/')
@login_required
def recipes():
    recipes = Recipe.query.all()
    return {'recipes': [recipe.to_dict() for recipe in recipes]}


@recipe_routes.route('/<int:id>')
@login_required
def recipe(id):
    recipe = Recipe.query.get(id)
    return recipe.to_dict()
