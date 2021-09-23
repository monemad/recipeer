from app.models import db, Recipe

def seed_recipes():
    recipes = []

    recipes.append(Recipe(
        title='Braised Lemongrass Short Ribs',
        difficulty=5,
        cook_time=500,
        user_id=7
        ))

    recipes.append(Recipe(
        title='Honey Muenstard Grilled Cheese',
        difficulty=2,
        cook_time=20,
        user_id=7
        ))

    recipes.append(Recipe(
        title='Saucy & Spicy Rice Noodles',
        difficulty=3,
        cook_time=500,
        user_id=4
        ))

    for r in recipes:
        db.session.add(r)
    db.session.commit()

def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
