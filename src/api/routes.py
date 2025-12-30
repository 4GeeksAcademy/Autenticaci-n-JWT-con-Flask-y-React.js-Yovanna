from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    if not email or not password:
        return jsonify({"msg": "Datos incompletos"}), 400
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 400
    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado"}), 201


@api.route('/token', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    if not email or not password:
        return jsonify({"msg": "Datos incompletos"}), 400
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Credenciales inválidas"}), 401
    return jsonify({"msg": "Login exitoso", "token": "ok"}), 200


@api.route('/private', methods=['GET'])
def private():
    auth_header = request.headers.get("Authorization", "")
    if auth_header != "Bearer ok":
        return jsonify({"msg": "No autorizado"}), 401
    return jsonify({"msg": "Contenido privado"}), 200
