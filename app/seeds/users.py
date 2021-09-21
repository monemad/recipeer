from app.models import db, User

def seed_users():
    demo = User(
        username='Demo', email='demo@user.com', password='password')
    ivy = User(
        username='WellHelloIvy', email='ivy@huynh.com', password='password')
    kris = User(
        username='k_mart', email='kris@mart.com', password='password')
    zane = User(
        username='TheChamp', email='thechamp@thechamp.com', password='password')
    shawn = User(
        username='ForlornShinobi', email='shawn@boyle.com', password='password')
    kiara = User(
        username='keipara', email='kiara@mendaros.com', password='password')
    moiz = User(
        username='wizkika', email='therealwizkika@gmail.com', password='password')

    db.session.add(demo)
    db.session.add(ivy)
    db.session.add(kris)
    db.session.add(zane)
    db.session.add(shawn)
    db.session.add(kiara)
    db.session.add(moiz)

    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
