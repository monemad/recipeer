from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, UserIngredient

user_ingredient_routes = Blueprint('user-ingredients', __name__)

@user_ingredient_routes.route('/', methods=['POST'])
@login_required
def create_user_ingredient():
    data = request.get_json()
    order = data['order']
    multiplier = data['multiplier']
    recipe_ingredient_id = data['recipe_ingredient_id']
    user_id = data['user_id']

    new_user_ingredient = UserIngredient(order=order, multiplier=multiplier, recipe_ingredient_id=recipe_ingredient_id, user_id=user_id)
    db.session.add(new_user_ingredient)
    db.session.commit()
    updated_user = User.query.get(user_id)
    return updated_user.to_session_dict()


@user_ingredient_routes.route('/<int:id>/', methods=['PUT'])
@login_required
def edit_user_ingredient(id):
    data = request.get_json()
    multiplier = data['multiplier']

    user_ingredient = UserIngredient.query.get(id)
    user_ingredient.multiplier = multiplier
    db.session.commit()
    updated_user = User.query.get(user_ingredient.user_id)
    return updated_user.to_session_dict()


@user_ingredient_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_user_ingredient(id):
    user_ingredient = UserIngredient.query.get(id)
    user_id = user_ingredient.recipe_id
    db.session.delete(user_ingredient)
    db.session.commit()
    updated_user = User.query.get(user_id)
    return updated_user.to_session_dict()
