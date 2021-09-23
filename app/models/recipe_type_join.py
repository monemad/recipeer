from .db import db

recipe_type_joins_table = db.Table(
    'recipe_type_joins',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipes.id')),
    db.Column('type_id', db.Integer, db.ForeignKey('types.id'))
)

# class RecipeTypeJoin(db.Model):
#     __tablename__ = "recipe_type_joins"

#     id = db.Column(db.Integer, primary_key=True)
#     recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
#     type_id = db.Column(db.Integer, db.ForeignKey('types.id'), nullable=False)
