from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    img_url = db.Column(db.String(255), nullable=True)

    recipes = db.relationship('Recipe', back_populates='user', cascade='all, delete-orphan')
    shopping_list = db.relationship('UserIngredient', cascade='all, delete-orphan')
    ratings = db.relationship('Rating', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        recipes = [recipe.id for recipe in self.recipes]

        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'imgUrl': self.img_url,
            'recipes': recipes
        }

    def to_session_dict(self):
        recipes = [recipe.id for recipe in self.recipes]
        shopping_list = [{
            'id': item.id,
            'order': item.order,
            'multiplier': item.multiplier,
            'ingredientId': item.recipe_ingredient.ingredient_id,
            'unitId': item.recipe_ingredient.unit_id,
            'recipeId': item.recipe_ingredient.recipe_id
        } for item in self.shopping_list]
        ratings = [{
            'id': rating.id,
            'recipeId': rating.recipe_id,
            'value': rating.value,
        } for rating in self.ratings]

        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'imgUrl': self.img_url,
            'recipes': recipes,
            'shoppingList': shopping_list,
            'ratings': ratings
        }
