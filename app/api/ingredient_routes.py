from flask import Blueprint
from flask_login import login_required
from app.models import db, Ingredient

ingredient_routes = Blueprint('ingredients', __name__)

@ingredient_routes.route('/')
def ingredients():
    ingredients = Ingredient.query.all()
    return {'ingredients': [ingredient.to_dict() for ingredient in ingredients]}

# @ingredient_routes.route('/')
# @login_required
# def ingredients():
#     ingredients = Ingredient.query.all()
#     return {'ingredients': [ingredient.to_dict() for ingredient in ingredients]}
