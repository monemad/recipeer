from app.models import db, Ingredient

def seed_ingredients():
    ingredients = []

    ingredients.append(Ingredient(name='short ribs'))
    ingredients.append(Ingredient(name='beef broth'))
    ingredients.append(Ingredient(name='lemongrass'))
    ingredients.append(Ingredient(name='salt'))
    ingredients.append(Ingredient(name='pepper'))
    ingredients.append(Ingredient(name='sliced sourdough bread'))
    ingredients.append(Ingredient(name='sliced muenster cheese'))
    ingredients.append(Ingredient(name='dijon mustard'))
    ingredients.append(Ingredient(name='dried oregano'))
    ingredients.append(Ingredient(name='honey'))
    ingredients.append(Ingredient(name='rice noodles'))
    ingredients.append(Ingredient(name='soy sauce'))
    ingredients.append(Ingredient(name='water'))
    ingredients.append(Ingredient(name='sriracha'))


    for r in ingredients:
        db.session.add(r)
    db.session.commit()

def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
