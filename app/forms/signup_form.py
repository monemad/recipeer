from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email
from .utils import username_exists, user_exists, validate_password

class SignUpForm(FlaskForm):
	first_name = StringField('first_name', validators=[DataRequired()])
	last_name = StringField('last_name', validators=[DataRequired()])
	username = StringField('username', validators=[DataRequired(), username_exists])
	email = StringField('email', validators=[DataRequired(), user_exists, Email()])
	password = StringField('password', validators=[DataRequired(), validate_password])
