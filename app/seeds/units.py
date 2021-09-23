from app.models import db, Unit

def seed_units():
    units = []

    units.append(Unit(name='cup'))
    units.append(Unit(name='pint'))
    units.append(Unit(name='quart'))
    units.append(Unit(name='gallon'))
    units.append(Unit(name='liter'))
    units.append(Unit(name='milliliter'))
    units.append(Unit(name='teaspoon'))
    units.append(Unit(name='tablespoon'))
    units.append(Unit(name='fluid ounce'))
    units.append(Unit(name='lb'))
    units.append(Unit(name='gram'))
    units.append(Unit(name='kilogram'))
    units.append(Unit(name='pinch'))
    units.append(Unit(name='each'))

    for u in units:
        db.session.add(u)
    db.session.commit()

def undo_units():
    db.session.execute('TRUNCATE units RESTART IDENTITY CASCADE;')
    db.session.commit()
