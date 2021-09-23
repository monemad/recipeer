from flask import Blueprint
from flask_login import login_required
from app.models import db, Type

type_routes = Blueprint('types', __name__)

@type_routes.route('/')
@login_required
def ingredients():
    types = Type.query.all()
    return {'types': [type.to_dict() for type in types]}
