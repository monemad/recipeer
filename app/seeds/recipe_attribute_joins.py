from app.models import db, recipe_attribute_joins_table

def seed_recipe_attribute_joins():

    db.session.execute(recipe_attribute_joins_table.insert().values(recipe_id = 1, attribute_id = 1))
    db.session.execute(recipe_attribute_joins_table.insert().values(recipe_id = 1, attribute_id = 5))
    db.session.execute(recipe_attribute_joins_table.insert().values(recipe_id = 1, attribute_id = 6))
    db.session.execute(recipe_attribute_joins_table.insert().values(recipe_id = 1, attribute_id = 8))
    db.session.execute(recipe_attribute_joins_table.insert().values(recipe_id = 2, attribute_id = 4))
    db.session.execute(recipe_attribute_joins_table.insert().values(recipe_id = 3, attribute_id = 3))
    db.session.execute(recipe_attribute_joins_table.insert().values(recipe_id = 3, attribute_id = 4))
    db.session.execute(recipe_attribute_joins_table.insert().values(recipe_id = 3, attribute_id = 5))
    db.session.commit()

def undo_recipe_attribute_joins():
    db.session.execute('TRUNCATE recipe_attribute_joins RESTART IDENTITY CASCADE;')
    db.session.commit()
