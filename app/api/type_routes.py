from flask import Blueprint
from flask_login import login_required
from app.models import db, Type

type_routes = Blueprint('types', __name__)

@type_routes.route('/')
def ingredients():
    types = Type.query.all()
    return {'types': [type.to_dict() for type in types]}
