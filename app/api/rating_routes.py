from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Recipe, Rating

rating_routes = Blueprint('ratings', __name__)
