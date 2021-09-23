from app.models import db, Rating

def seed_ratings():
    ratings = []

    ratings.append(Rating(
        value=5,
        recipe_id=1,
        user_id=1
        ))
    ratings.append(Rating(
        value=3,
        recipe_id=1,
        user_id=3
        ))
    ratings.append(Rating(
        value=4,
        recipe_id=1,
        user_id=6
        ))
    ratings.append(Rating(
        value=4,
        recipe_id=1,
        user_id=2
        ))
    ratings.append(Rating(
        value=1,
        recipe_id=2,
        user_id=3
        ))
    ratings.append(Rating(
        value=5,
        recipe_id=2,
        user_id=4
        ))
    ratings.append(Rating(
        value=3,
        recipe_id=3,
        user_id=3
        ))
    ratings.append(Rating(
        value=5,
        recipe_id=3,
        user_id=3
        ))
    ratings.append(Rating(
        value=4,
        recipe_id=3,
        user_id=7
        ))


    for r in ratings:
        db.session.add(r)
    db.session.commit()

def undo_ratings():
    db.session.execute('TRUNCATE ratings RESTART IDENTITY CASCADE;')
    db.session.commit()
