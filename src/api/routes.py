"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
from base64 import b64encode
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/register",methods=["POST"])
def add_new_user():
    try:
        body_froms=request.form

        name=body_froms.get("name",None)
        email=body_froms.get("email",None)
        password=body_froms.get("password",None)
        phone_number=body_froms.get("phone_number",None)
        country=body_froms.get("country",None)
        print(body_froms)
        if name is None or email is None or password is None or phone_number is None or country is None:
            return jsonify({"warning":"Incomplete Credential"}),400
        else: 
            user=User()
            user_exist=user.query.filter_by(email=email).one_or_none()
            print(user_exist)
            if user_exist is not None:
                
                return jsonify({"warning":"User Exist"}),400
                
            else:
                salt=b64encode(os.urandom(32)).decode("utf-8")
                password=generate_password_hash(f'{password}{salt}')

                user.name=name
                user.email=email
                user.password=password
                user.salt=salt
                user.phone_number=phone_number
                user.country=country

                db.session.add(user)
                try:
                    db.session.commit()
                    return jsonify("Usuario create"),200
                except Exception as err:
                    db.session.rollback()
                    return jsonify(f'Error{err.args}'),500
    except Exception as err:
        print(err)
        return jsonify(f'Error{err.args}'),500
    
@api.route("/login",methods=["POST"])
def login():
    try:
        body=request.json
        email=body.get("email", None)
        password=body.get("password", None)

        if email is None or password is None:
            return jsonify({"Warning":"Incomplete Credentials"}),400
        else:
            user=User.query.filter_by(email=email).one_or_none()
            if user is None:
                return jsonify({"Warning":"Invalid Credentials"}),401
            else:
                if check_password_hash(user.password,f"{password}{user.salt}"):
                    token=create_access_token(identity=str(user.id))
                    return jsonify(token=token, user=user.serialize())
                else:
                    return jsonify({"Warning":"Invalid Credentials"}),401
    except Exception as err:
        return jsonify(f"Error{err.args}")

# @api.route("/register/sellers", methods=["POST"])
# def register_sellers():
#    try:
#     body_forms=request.form

#     name=body_forms.get("name, None")
#     email=body_forms.get("email",None)
#     password=body_forms.get("password",None)

#     if name is None or email is None or password is None:
#         return jsonify({"warning":"Incomplete Credentials"}),401
#     else:
#         sellers=Sellers()
#         sellers_exist=sellers.query.filter_by(email=email).one_or_none()

#         if sellers_exist is not None:
#             return jsonify({"warning":"User already exist"}),401

#         else:
#             salt=b64encode(os.urandom(32)).decode("utf-8")
#             password=generate_password_hash(f'{password}{salt}')

#             sellers.name=name
#             sellers.email=email
#             sellers.password=password
#             sellers.salt=salt

#             db.session.add()
#             try:
#                 db.session.commit()
#                 return jsonify("User create"),200
#             except Exception as error:
#                 db.session.rollback()
#                 return jsonify(error.args),500
#    except Exception as err:
#     return jsonify(err.args),500


# body=request.json
#         email=body.get("email",None)
#         password=body.get("password", None)

#         if email is None or password is None:
#             return jsonify({"warning":"Incomplete Credentials"}),400
#         else:
#             user=User.query.filte_by(email=email).one_or_none()

#             if user is None:
#                 return jsonify({"warning":"Invalid Credentials"}),401
#             else:
#                 if check_password_hash(user.password,f"{password}{hash}"):
#                     token=create_access_token(identiry=str(user.id))
#                     return jsonify(token = token, user=user.serialize())
#                 else:
#                     return jsonify({"warning":"Invalid Credentials"}),401

# @api.route('/hello', methods=['POST'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200
    