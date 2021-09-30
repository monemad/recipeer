from .db import db
from .recipe_type_join import recipe_type_joins_table
from .recipe_attribute_join import recipe_attribute_joins_table

def sort_by_id(e):
    return e['id']

def sort_by_order(e):
    return e['order']

class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.Integer)
    cook_time = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates = 'recipes')
    types = db.relationship('Type', secondary=recipe_type_joins_table, cascade='all, delete')
    instructions = db.relationship('Instruction', cascade='all, delete-orphan')
    ingredients = db.relationship('RecipeIngredient', cascade='all, delete-orphan')
    attributes = db.relationship('Attribute', secondary=recipe_attribute_joins_table, cascade='all, delete')
    ratings = db.relationship('Rating', cascade='all, delete-orphan')
    pictures = db.relationship('Picture', cascade='all, delete-orphan')
    feedback = db.relationship('Feedback', cascade='all, delete-orphan')

    def to_dict(self):
        types = [type.id for type in self.types]

        types.sort()

        instructions = [{
            'id': instr.id,
            'step': instr.step,
            'order': instr.order
        } for instr in self.instructions]

        instructions.sort(key=sort_by_order)

        ingredients = [{
            'id': ing.id,
            'order': ing.order,
            'quantity': ing.quantity,
            'ingredientId': ing.ingredient_id,
            'unitId': ing.unit_id
        } for ing in self.ingredients]

        ingredients.sort(key=sort_by_order)

        attributes = [attr.id for attr in self.attributes]

        attributes.sort()

        ratings = [{
            'id': rating.id,
            'userId': rating.user_id,
            'value': rating.value,
        } for rating in self.ratings]

        pictures = [{
            'id': picture.id,
            'imgUrl': picture.img_url,
            'order': picture.order,
            'userId': picture.user_id,
        } for picture in self.pictures]

        pictures.sort(key=sort_by_order)

        feedback = [{
            'id': feedback.id,
            'content': feedback.content,
            'userId': feedback.user_id,
        } for feedback in self.feedback]

        feedback.sort(reverse=True, key=sort_by_id)

        return {
            'id': self.id,
            'title': self.title,
            'difficulty': self.difficulty,
            'cookTime': self.cook_time,
            'userId': self.user_id,
            'types': types,
            'instructions': instructions,
            'ingredients': ingredients,
            'attributes': attributes,
            'ratings': ratings,
            'pictures': pictures,
            'feedback': feedback
        }
