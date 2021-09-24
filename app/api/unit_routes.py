from flask import Blueprint
from flask_login import login_required
from app.models import db, Unit

unit_routes = Blueprint('units', __name__)

@unit_routes.route('/')
def units():
    units = Unit.query.all()
    return {'units': [unit.to_dict() for unit in units]}
