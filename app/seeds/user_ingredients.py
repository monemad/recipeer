from app.models import db, UserIngredient, recipe_ingredient

def seed_user_ingredients():
    user_ingredients = []

    user_ingredients.append(UserIngredient(
        order=1,
        multiplier=1,
        recipe_ingredient_id=1,
        user_id=7,
        ))
    user_ingredients.append(UserIngredient(
        order=2,
        multiplier=4,
        recipe_ingredient_id=4,
        user_id=7,
        ))
    user_ingredients.append(UserIngredient(
        order=3,
        multiplier=4,
        recipe_ingredient_id=5,
        user_id=7,
        ))
    user_ingredients.append(UserIngredient(
        order=4,
        multiplier=2,
        recipe_ingredient_id=9,
        user_id=7,
        ))
    user_ingredients.append(UserIngredient(
        order=5,
        multiplier=1,
        recipe_ingredient_id=12,
        user_id=7,
        ))


    for u in user_ingredients:
        db.session.add(u)
    db.session.commit()

def undo_user_ingredients():
    db.session.execute('TRUNCATE user_ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
