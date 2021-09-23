from .db import db

class UserIngredient(db.Model):
    __tablename__ = "user_ingredients"

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, nullable=False)
    multiplier = db.Column(db.Float, nullable=False)
    recipe_ingredient_id = db.Column(db.Integer, db.ForeignKey('recipe_ingredients.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    recipe_ingredient = db.relationship("RecipeIngredient")
