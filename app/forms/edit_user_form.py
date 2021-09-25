from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from .utils import username_exists, user_exists

class EditUserForm(FlaskForm):
    user_id = IntegerField('user_id')
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    username = StringField('username', validators=[username_exists])
    email = StringField('email', validators=[user_exists])
    password = StringField('password')
