from flask import Blueprint
from flask_login import login_required
from app.models import db, Attribute

attribute_routes = Blueprint('attributes', __name__)

@attribute_routes.route('/')
@login_required
def ingredients():
    attributes = Attribute.query.all()
    return {'attributes': [attribute.to_dict() for attribute in attributes]}
