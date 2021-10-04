from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired
from .utils import username_exists, validate_password

class EditUserForm(FlaskForm):
    user_id = IntegerField('user_id')
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired(), username_exists])
    password = StringField('password', validators=[validate_password])
