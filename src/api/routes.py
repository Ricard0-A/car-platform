"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Seller,Car
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
from base64 import b64encode
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import cloudinary.uploader as uploader


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/register",methods=["POST"])
def add_new_user():
    try:
        body_froms=request.form
        body_files=request.files
        
        name=body_froms.get("name",None)
        email=body_froms.get("email",None)
        password=body_froms.get("password",None)
        phone_number=body_froms.get("phone_number",None)
        country=body_froms.get("country",None)
        avatar=body_files.get("avatar",None)
        # selelr=body_froms.get("seller",None)
        print(body_froms)
        if name is None or email is None or password is None or phone_number is None or country is None:
            return jsonify({"warning":"Incomplete Credential"}),401
        else: 
            user=User()
            user_exist=user.query.filter_by(email=email).one_or_none()
            print(user_exist)
            if user_exist is not None:
                
                return jsonify({"warning":"User Exist"}),401
                
            else:
                salt=b64encode(os.urandom(32)).decode("utf-8")
                password=generate_password_hash(f'{password}{salt}')

                user.name=name
                user.email=email
                user.password=password
                user.salt=salt
                user.phone_number=phone_number
                user.country=country
                user.avatar=avatar

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

@api.route("/register/sellers", methods=["POST"])
def register_sellers():
   try:
    body_froms=request.form
    
    name = body_froms.get("name", None)
    email = body_froms.get("email", None)
    password = body_froms.get("password", None)
    country = body_froms.get("country", None)
    print(body_froms)
    if name is None or email is None or password is None or country is None:
        return jsonify({"warning":"Incomplete Credentials"}),401
    else:
        sellers=Seller()
        sellers_exist=sellers.query.filter_by(email=email).one_or_none()

        if sellers_exist is not None:
            return jsonify({"warning":"User already exist"}),401

        else:
            salt=b64encode(os.urandom(32)).decode("utf-8")
            password=generate_password_hash(f'{password}{salt}')

            sellers.name=name
            sellers.email=email
            sellers.password=password
            sellers.salt=salt
            sellers.country=country

            db.session.add(sellers)
            try:
                db.session.commit()
                return jsonify("User create"),200
            except Exception as error:
                db.session.rollback()
                print(error)
                return jsonify(error.args),500
   except Exception as err:
    print(err)
    return jsonify(err.args),500

@api.route("/login/sellers",methods=["POST"])
def login_sellers():
   try:
       body=request.json

       email=body.get("email",None)
       password=body.get("password",None)

       if email is None or password is None:
           return jsonify({"warning":"Incomplete Credentials"}),401
       else:
        seller=Seller.query.filter_by(email=email).one_or_none()
        print(seller)
        if seller is None:
            return jsonify({"warning":"Invalid Credentals"}),401
        else:
            if check_password_hash(seller.password,f"{password}{seller.salt}"):
        
                token=create_access_token(identity=str(seller.id))
                return jsonify({"token":token, 
                                "seller":seller.serialize()})
            else:
                return jsonify({"warning":"Invalid Credentials"}),401
   except Exception as err:
       print(err)
       return jsonify(err.args)



@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    try:
        user_id=get_jwt_identity()
        user=User.query.filter_by(user_id)
        if user is None:
            return jsonify ({"warning":"User Not Found"}),401
        return jsonify(user.serialize()),200
    except Exception as err:
        return jsonify(err.args)

@api.route("/seller/cars", methods=["POST"])
@jwt_required()
def add_cars():
    seller_id = int(get_jwt_identity())
    # seller=Seller.query.filter_by(id=seller_id).one_or_none()
    
    # if seller is None:
    #     return jsonify({"warning":"Seller Not Found"}),401
    # try:
    body_froms=request.form
    body_files=request.files


    #     print(body_froms)
    model_make_id = body_froms.get("model_make_id", None)
    model_name = body_froms.get("model_name", None)
    model_trim = body_froms.get("model_trim",None)
    model_year = body_froms.get("model_year",None)
    model_body = body_froms.get("model_body",None)
    make_country = body_froms.get("make_country",None) 
    model_amount=body_froms.get("model_amount",None)
    model_picture=body_files.get("model_picture",None)
    
    print(body_files)
    print(body_froms)
        
    if model_make_id is None or model_name is None or model_trim is None or model_year is None or model_body is None or make_country is None or model_amount is None:
        return jsonify({"warning":"Incomplete Values"}),400
    else:
        car=Car()

        if model_picture is not None:
            model_picture = uploader.upload(model_picture)
            model_picture = model_picture["secure_url"]
            car.model_picture=model_picture

        car.model_make_id=model_make_id
        car.model_name=model_name
        car.model_trim=model_trim
        car.model_year=model_year
        car.model_body=model_body
        car.make_country=make_country
        car.model_amount=model_amount
        car.seller_id=seller_id
        print(model_picture)
    try:
        
        db.session.add(car)
        db.session.commit()

        return jsonify({"warning":"Car added"}),200
    except Exception as err:
        db.session.rollback()
        print(err.args) 
        return jsonify({"Warning":"Error"}),500                   
    

@api.route("/seller/cars",methods=["GET"])
@jwt_required()
def get_cars():
    seller_id = int(get_jwt_identity())
    seller = Seller.query.filter_by(id=seller_id).one_or_none()
    
    if seller is None:
        return jsonify({"warning":"Seller Not Found"}),401
    else:
        return jsonify(seller.serialize_seller_cars()),200


@api.route("/seller/cars/<int:car_id>", methods=["PUT"])
@jwt_required()
def edit_car(car_id):
    seller_id = int(get_jwt_identity())
    seller = Seller.query.filter_by(id=seller_id).one_or_none()

    if seller is None:
        return jsonify({"warning":"Seller Not Found"}),401
    try:
        car=Car.query.filter_by(id=car_id).one_or_none()
        if car is None:
            return jsonify({"warning":"Car Not Found"}),401
        else:
            body_froms=request.form
            body_files=request.files

            model_make_id = body_froms.get("model_make_id",model_make_id)
            model_name = body_froms.get("model_name",model_name)
            model_trim = body_froms.get("model_trim",model_trim)
            model_year = body_froms.get("model_year",model_year)
            model_body = body_froms.get("model_body",model_body)
            make_country = body_froms.get("make_country",make_country)
            model_amount=body_froms.get("model_amount",model_amount)
            model_picture=body_files.get("model_picture",model_picture)

            db.session.commit() 

            return jsonify({"warning":"Car Edited"}),200
    except Exception as err:
        db.rollback()
        return jsonify(err.args)
    
@api.route("/seller/cars<int:car_id>", methods=["DELETE"])
def delete_car(car_id): 

    seller_id=int(get_jwt_identity())
    seller=Seller.query.filter_by(id=seller_id).oner_or_none()

    if seller is None:
        return jsonify("This account don't exist"),400
    try:
        car=Car.quer.filter.by(id=car_id).one_or_none()
        if car is None:
            return jsonify("This car doesn't exist"),400
        db.session.delete(car)
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        return jsonify(err)
