from app.models import db, RecipeIngredient

def seed_recipe_ingredients():
    recipe_ingredients = []

    recipe_ingredients.append(RecipeIngredient(
        order=1,
        quantity=4,
        unit_id=10,
        ingredient_id=1,
        recipe_id=1
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=2,
        quantity=2,
        unit_id=3,
        ingredient_id=2,
        recipe_id=1
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=3,
        quantity=1,
        unit_id=14,
        ingredient_id=3,
        recipe_id=1
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=1,
        quantity=2,
        unit_id=14,
        ingredient_id=6,
        recipe_id=2
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=2,
        quantity=2,
        unit_id=14,
        ingredient_id=7,
        recipe_id=2
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=3,
        quantity=1,
        unit_id=7,
        ingredient_id=8,
        recipe_id=2
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=4,
        quantity=0.25,
        unit_id=7,
        ingredient_id=9,
        recipe_id=2
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=5,
        quantity=1,
        unit_id=7,
        ingredient_id=10,
        recipe_id=2
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=1,
        quantity=200,
        unit_id=11,
        ingredient_id=11,
        recipe_id=3
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=2,
        quantity=1,
        unit_id=8,
        ingredient_id=12,
        recipe_id=3
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=3,
        quantity=2,
        unit_id=1,
        ingredient_id=13,
        recipe_id=3
        ))
    recipe_ingredients.append(RecipeIngredient(
        order=4,
        quantity=2,
        unit_id=7,
        ingredient_id=14,
        recipe_id=3
        ))


    for r in recipe_ingredients:
        db.session.add(r)
    db.session.commit()

def undo_recipe_ingredients():
    db.session.execute('TRUNCATE recipe_ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
