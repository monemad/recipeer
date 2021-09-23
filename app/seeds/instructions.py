from app.models import db, Instruction

def seed_instructions():
    instructions = []

    instructions.append(Instruction(
        step='Beef',
        order=1,
        recipe_id=1
        ))
    instructions.append(Instruction(
        step='Season',
        order=2,
        recipe_id=1
        ))
    instructions.append(Instruction(
        step='Aromatics',
        order=3,
        recipe_id=1
        ))
    instructions.append(Instruction(
        step='Braise',
        order=4,
        recipe_id=1
        ))
    instructions.append(Instruction(
        step='Put some stuff between the bread',
        order=1,
        recipe_id=2
        ))
    instructions.append(Instruction(
        step='Put it on the pan',
        order=2,
        recipe_id=2
        ))
    instructions.append(Instruction(
        step='Get it melty',
        order=3,
        recipe_id=2
        ))
    instructions.append(Instruction(
        step='Put rice noodles in saute pan with some water',
        order=1,
        recipe_id=3
        ))
    instructions.append(Instruction(
        step='Boil and reduce liquid',
        order=2,
        recipe_id=3
        ))
    instructions.append(Instruction(
        step='Add some sauces',
        order=3,
        recipe_id=3
        ))


    for i in instructions:
        db.session.add(i)
    db.session.commit()

def undo_instructions():
    db.session.execute('TRUNCATE instructions RESTART IDENTITY CASCADE;')
    db.session.commit()
