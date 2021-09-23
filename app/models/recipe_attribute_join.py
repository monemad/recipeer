from .db import db

recipe_attribute_joins_table = db.Table('recipe_attribute_joins',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipes.id')),
    db.Column('attribute_id', db.Integer, db.ForeignKey('attributes.id'))
)

# class RecipeAttributeJoin(db.Model):
#     __tablename__ = "recipe_attribute_joins"

#     id = db.Column(db.Integer, primary_key=True)
#     recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
#     attribute_id = db.Column(db.Integer, db.ForeignKey('attributes.id'), nullable=False)
