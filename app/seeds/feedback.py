from app.models import db, Feedback

def seed_feedback():
    feedback = []

    feedback.append(Feedback(
        content='Delicious! I subbed the beef with chocolate and it was fantastic',
        recipe_id=1,
        user_id=5
        ))
    feedback.append(Feedback(
        content='This was really ok, I guess not the best',
        recipe_id=1,
        user_id=1
        ))
    feedback.append(Feedback(
        content='Wow! Delicious!',
        recipe_id=1,
        user_id=3
        ))
    feedback.append(Feedback(
        content='Tasted like feet',
        recipe_id=2,
        user_id=6
        ))
    feedback.append(Feedback(
        content='Not as good as rocks, but it\'s ok for a sandwich',
        recipe_id=2,
        user_id=2
        ))
    feedback.append(Feedback(
        content='Great flavor! Would make this again.',
        recipe_id=3,
        user_id=7
        ))
    feedback.append(Feedback(
        content='I\'m the Champ',
        recipe_id=3,
        user_id=5
        ))


    for f in feedback:
        db.session.add(f)
    db.session.commit()

def undo_feedback():
    db.session.execute('TRUNCATE feedback RESTART IDENTITY CASCADE;')
    db.session.commit()
