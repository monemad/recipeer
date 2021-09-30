from flask import Blueprint, request
from werkzeug.utils import secure_filename
from app.models import User, db
from app.forms import LoginForm, SignUpForm, EditUserForm
from flask_login import current_user, login_user, logout_user, login_required
from .aws_s3 import public_file_upload
import os

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Converts WTForms validation errors into an array
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            if isinstance(error, list):
                for err in error:
                    errorMessages.append(f'{field} : {err}')
            else:
                errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_session_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs in a user
    """
    form = LoginForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_session_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/demo', methods=['GET'])
def demo():
    """
    Logs in the demo user
    """
    demo = User.query.filter(User.id == 1).first()
    login_user(demo)
    return demo.to_session_dict()


@auth_routes.route('/logout')
def logout():
    """
    Logs out a user
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Signs up a new user
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        img_url = None
        img_file = None
        if "img_file" in request.files:
            img_file = request.files["img_file"]

        if img_file:
            try:
                temp_file_name = "app/api/tmp" + secure_filename(img_file.filename)
                img_file.save(temp_file_name)
                img_url = public_file_upload(temp_file_name, "recipeer-bucket")
                os.remove(temp_file_name)
            except KeyError:
                pass
                
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            img_url=img_url
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_session_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/edit', methods=['PUT'])
@login_required
def edit_user():
    """
    Edits the logged in user
    """
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        img_url = None
        img_file = None
        if "img_file" in request.files:
            img_file = request.files["img_file"]

        if img_file:
            try:
                temp_file_name = "app/api/tmp" + secure_filename(img_file.filename)
                img_file.save(temp_file_name)
                img_url = public_file_upload(temp_file_name, "recipeer-bucket")
                os.remove(temp_file_name)
            except KeyError:
                pass

        user = User.query.get(form.data['user_id'])
        if form.data['first_name']:
            user.first_name = form.data['first_name']
        if form.data['last_name']:
            user.last_name = form.data['last_name']
        if form.data['username']:
            user.username = form.data['username']
        if form.data['password']:
            user.password = form.data['password']
        if img_url:
            user.img_url = img_url
        # user = User(
        #     first_name=form.data['first_name'],
        #     last_name=form.data['last_name'],
        #     username=form.data['username'],
        #     email=form.data['email'],
        #     password=form.data['password'],
        #     img_url=img_url
        # )
        # db.session.add(user)
        db.session.commit()
        # login_user(user)
        return user.to_session_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
