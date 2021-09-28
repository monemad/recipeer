from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Recipe, Rating

rating_routes = Blueprint('ratings', __name__)


@rating_routes.route('/', methods=['POST'])
@login_required
def create_rating():
    data = request.get_json()
    recipe_id = data['recipe_id']
    user_id = data['user_id']
    value = data['value']
    new_rating = Rating(recipe_id=recipe_id, user_id=user_id, value=value)
    db.session.add(new_rating)
    db.session.commit()
    recipe = Recipe.query.get(recipe_id)
    return recipe.to_dict()


@rating_routes.route('/<int:id>/', methods=['PUT'])
@login_required
def edit_rating(id):
    value = request.get_json()['value']
    rating = Rating.query.get(id)
    rating.value = value
    db.session.commit()
    recipe = Recipe.query.get(rating.recipe_id)
    return recipe.to_dict()


@rating_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_rating(id):
    rating = Rating.query.get(id)
    recipe_id = rating.recipe_id
    db.session.delete(rating)
    db.session.commit()
    recipe = Recipe.query.get(recipe_id)
    return recipe.to_dict()
