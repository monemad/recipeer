from app.models import db, User

def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@user.com', password='password', img_url='https://i.imgur.com/Sm559aj.png')
    ivy = User(
        first_name='Ivy', last_name='Huynh', username='WellHelloIvy', email='ivy@huynh.com', password='password', img_url='https://i.imgur.com/Sm559aj.png')
    kris = User(
        first_name='Kristian', last_name='Martinez', username='k_mart', email='kris@mart.com', password='password', img_url='https://i.imgur.com/Sm559aj.png')
    zane = User(
        first_name='Zane', last_name='Hamadi', username='TheChamp', email='thechamp@thechamp.com', password='password', img_url='https://i.imgur.com/Sm559aj.png')
    shawn = User(
        first_name='Shawn', last_name='Boyle', username='ForlornShinobi', email='shawn@boyle.com', password='password', img_url='https://i.imgur.com/Sm559aj.png')
    kiara = User(
        first_name='Kiara', last_name='Mendaros', username='keipara', email='kiara@mendaros.com', password='password', img_url='https://i.imgur.com/Sm559aj.png')
    moiz = User(
        first_name='Moiz', last_name='Ahmad', username='wizkika', email='therealwizkika@gmail.com', password='password', img_url='https://i.imgur.com/Sm559aj.png')

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
