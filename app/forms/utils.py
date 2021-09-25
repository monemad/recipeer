from wtforms.validators import ValidationError
from app.models import User

def user_exists(form, field):
    user_id = 0
    if hasattr(form, 'user_id'):
        user_id = form.user_id.data
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != user_id:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    user_id = 0
    if hasattr(form, 'user_id'):
        user_id = form.user_id.data
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != user_id:
        raise ValidationError('Username is already in use.')
