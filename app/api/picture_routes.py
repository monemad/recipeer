from app.api.user_routes import user
from flask import Blueprint, request
from werkzeug.utils import secure_filename
from flask_login import login_required
from app.models import db, Recipe, Picture
from .aws_s3 import public_file_upload
import os

picture_routes = Blueprint('pictures', __name__)

@picture_routes.route('/', methods=['POST'])
@login_required
def create_picture():
    form = request.form
    order = form['order']
    recipe_id = form['recipe_id']
    user_id = form['user_id']
    img_url = None
    img_file = None

    if "img_file" in request.files:
        img_file = request.files["img_file"]

        if img_file:
            try:
                temp_file_name = "app/api/tmp" + secure_filename(img_file.filename)
                img_file.save(temp_file_name)
                img_url = public_file_upload(temp_file_name, "recipeer-bucket")
                os.remove(temp_file_name)
            except KeyError:
                pass

    new_picture = Picture(img_url=img_url, order=order, recipe_id=recipe_id, user_id=user_id)
    db.session.add(new_picture)
    db.session.commit()
    updated_recipe = Recipe.query.get(recipe_id)
    return updated_recipe.to_dict()
