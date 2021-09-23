from app.models import db, Attribute

def seed_attributes():
    attributes = []

    attributes.append(Attribute(name='gluten-free'))
    attributes.append(Attribute(name='sugar-free'))
    attributes.append(Attribute(name='vegan'))
    attributes.append(Attribute(name='vegetarian'))
    attributes.append(Attribute(name='dairy-free'))
    attributes.append(Attribute(name='halal'))
    attributes.append(Attribute(name='kosher'))
    attributes.append(Attribute(name='low-carb'))

    for a in attributes:
        db.session.add(a)
    db.session.commit()

def undo_attributes():
    db.session.execute('TRUNCATE attributes RESTART IDENTITY CASCADE;')
    db.session.commit()
