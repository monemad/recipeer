from flask.cli import AppGroup
from .users import seed_users, undo_users
from .recipes import seed_recipes, undo_recipes
from .types import seed_types, undo_types
from .attributes import seed_attributes, undo_attributes
from .recipe_attribute_joins import seed_recipe_attribute_joins, undo_recipe_attribute_joins
from .recipe_type_joins import seed_recipe_type_joins, undo_recipe_type_joins
from .feedback import seed_feedback, undo_feedback
from .ratings import seed_ratings, undo_ratings
from .instructions import seed_instructions, undo_instructions
from .ingredients import seed_ingredients, undo_ingredients
from .units import seed_units, undo_units
from .recipe_ingredients import seed_recipe_ingredients, undo_recipe_ingredients
from .user_ingredients import seed_user_ingredients, undo_user_ingredients
from .pictures import seed_pictures, undo_pictures

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    seed_users()
    seed_recipes()
    seed_types()
    seed_attributes()
    seed_recipe_attribute_joins()
    seed_recipe_type_joins()
    seed_feedback()
    seed_ratings()
    seed_instructions()
    seed_ingredients()
    seed_units()
    seed_recipe_ingredients()
    seed_user_ingredients()
    seed_pictures()

@seed_commands.command('undo')
def undo():
    undo_users()
    undo_recipes()
    undo_types()
    undo_attributes()
    undo_recipe_attribute_joins()
    undo_recipe_type_joins()
    undo_feedback()
    undo_ratings()
    undo_instructions()
    undo_ingredients()
    undo_units()
    undo_recipe_ingredients()
    undo_user_ingredients()
    undo_pictures()
