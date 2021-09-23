from app.models import db, recipe_type_joins_table

def seed_recipe_type_joins():
    
    db.session.execute(recipe_type_joins_table.insert().values(recipe_id = 1, type_id = 1))
    db.session.execute(recipe_type_joins_table.insert().values(recipe_id = 1, type_id = 7))
    db.session.execute(recipe_type_joins_table.insert().values(recipe_id = 2, type_id = 1))
    db.session.execute(recipe_type_joins_table.insert().values(recipe_id = 2, type_id = 6))
    db.session.execute(recipe_type_joins_table.insert().values(recipe_id = 3, type_id = 1))
    db.session.execute(recipe_type_joins_table.insert().values(recipe_id = 3, type_id = 2))
    db.session.commit()

def undo_recipe_type_joins():
    db.session.execute('TRUNCATE recipe_type_joins RESTART IDENTITY CASCADE;')
    db.session.commit()
