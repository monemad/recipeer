from .db import db

class Instruction(db.Model):
    __tablename__ = "instructions"

    id = db.Column(db.Integer, primary_key=True)
    step = db.Column(db.String(500), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
