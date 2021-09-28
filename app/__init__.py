import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.auth_routes import auth_routes
from .api.user_routes import user_routes
from .api.recipe_routes import recipe_routes
from .api.ingredient_routes import ingredient_routes
from .api.unit_routes import unit_routes
from .api.type_routes import type_routes
from .api.attribute_routes import attribute_routes
from .api.recipe_ingredient_routes import recipe_ingredient_routes
from .api.instruction_routes import instruction_routes
from .api.picture_routes import picture_routes
from .api.feedback_routes import feedback_routes
from .api.rating_routes import rating_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Add our seed commands to flask
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(recipe_routes, url_prefix='/api/recipes')
app.register_blueprint(ingredient_routes, url_prefix='/api/ingredients')
app.register_blueprint(unit_routes, url_prefix='/api/units')
app.register_blueprint(type_routes, url_prefix='/api/types')
app.register_blueprint(attribute_routes, url_prefix='/api/attributes')
app.register_blueprint(recipe_ingredient_routes, url_prefix='/api/recipe-ingredients')
app.register_blueprint(instruction_routes, url_prefix='/api/instructions')
app.register_blueprint(picture_routes, url_prefix='/api/pictures')
app.register_blueprint(feedback_routes, url_prefix='/api/feedback')
app.register_blueprint(rating_routes, url_prefix='/api/ratings')
db.init_app(app)
Migrate(app, db)

# Impleme
CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
