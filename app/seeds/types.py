from app.models import db, Type

def seed_types():
    types = []

    types.append(Type(name='entree'))
    types.append(Type(name='side'))
    types.append(Type(name='dessert'))
    types.append(Type(name='drink'))
    types.append(Type(name='breakfast'))
    types.append(Type(name='lunch'))
    types.append(Type(name='dinner'))
    types.append(Type(name='snack'))
    types.append(Type(name='alcohol'))

    for t in types:
        db.session.add(t)
    db.session.commit()

def undo_types():
    db.session.execute('TRUNCATE types RESTART IDENTITY CASCADE;')
    db.session.commit()
