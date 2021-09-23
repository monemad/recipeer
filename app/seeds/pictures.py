from app.models import db, Picture

def seed_pictures():
    pictures = []

    pictures.append(Picture(
        img_url='https://3.bp.blogspot.com/-bvhwi7uUAjY/VOl1ooGiWlI/AAAAAAAACps/SWQNHNpeKQk/s1600/VYVU0644a+(1024x658).jpg',
        order=None,
        recipe_id=1,
        user_id=7
        ))
    pictures.append(Picture(
        img_url='https://cherryrepublic.com/content/blog/2018/10/DSC_0329-1024x683.jpg',
        order=None,
        recipe_id=2,
        user_id=7
        ))
    pictures.append(Picture(
        img_url='https://hips.hearstapps.com/hmg-prod/images/delish-crack-noodles-wide-2-1525355094.jpg',
        order=None,
        recipe_id=3,
        user_id=4
        ))


    for p in pictures:
        db.session.add(p)
    db.session.commit()

def undo_pictures():
    db.session.execute('TRUNCATE pictures RESTART IDENTITY CASCADE;')
    db.session.commit()
