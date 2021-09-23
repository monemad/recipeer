from .db import db

class Picture(db.Model):
    __tablename__ = "pictures"

    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(500), nullable=False)
    order = db.Column(db.Integer)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
