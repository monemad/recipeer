from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Recipe, Feedback, user

feedback_routes = Blueprint('feedback', __name__)

@feedback_routes.route('/', methods=['POST'])
@login_required
def create_feedback():
    data = request.get_json()
    content = data['content']
    recipe_id = data['recipe_id']
    user_id = data['user_id']

    new_feedback = Feedback(content=content, recipe_id=recipe_id, user_id=user_id)
    db.session.add(new_feedback)
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_id)
    return updated_recipe.to_dict()
