from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Ingredient

ingredient_routes = Blueprint('ingredients', __name__)

@ingredient_routes.route('/')
def ingredients():
    ingredients = Ingredient.query.all()
    return {'ingredients': [ingredient.to_dict() for ingredient in ingredients]}

@ingredient_routes.route('/', methods=['POST'])
@login_required
def create_ingredient():
    name = request.get_json()['name']
    ingredient = Ingredient.query.filter(Ingredient.name == name).first()
    if ingredient: return ingredient.to_dict()
    new_ingredient = Ingredient(name=name)
    db.session.add(new_ingredient)
    db.session.commit()
    return new_ingredient.to_dict()
