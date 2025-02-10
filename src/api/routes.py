"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Seller,Car
from api.utils import generate_sitemap, APIException,send_mail
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
from base64 import b64encode
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import cloudinary.uploader as uploader
from datetime import datetime, timedelta


# MAX_FAILED_ATTEMPTS=5
# LOCKOUT_TIME=15

api = Blueprint('api', __name__)

expire_in_minute = 15
expire_delta=timedelta(minutes=expire_in_minute)

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
            
            if user_exist is not None:
                
                return jsonify({"warning":"User Exist"}),401
                
            else:
                salt=b64encode(os.urandom(32)).decode("utf-8")
                password=generate_password_hash(f'{password}{salt}')

                if avatar is not None:
                    avatar = uploader.upload(avatar)
                    avatar = avatar["secure_url"]
                    user.avatar = avatar

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
        body=request.json   #Esto es lo que el usuario me mando 
        email=body.get("email", None)
        password=body.get("password", None)

        if email is None or password is None:
            return jsonify({"Warning":"Incomplete Credentials"}),400
        else:
            user=User.query.filter_by(email=email).first()
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
    name_representative = body_froms.get("name_representative",None)
    license = body_froms.get("license",None)
    license_expiration = body_froms.get("license_expiration",None)
    phone_number = body_froms.get("phone_number",None)
    register_number = body_froms.get("register_number",None)
    address = body_froms.get("address",None)
    test_drive = body_froms.get("test_drive",None)
    country = body_froms.get("country", None)
    print(body_froms)
    if name is None or email is None or password is None or country is None or name_representative is None or license is None or license_expiration is None or phone_number is None or register_number is None or address is None or test_drive is None:
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
            sellers.name_representative=name_representative
            sellers.license=license
            sellers.license_expiration=license_expiration
            sellers.phone_number=phone_number
            sellers.register_number=register_number
            sellers.address=address
            sellers.test_drive=test_drive
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
                print(token)
                return jsonify({"token":token, 
                                "seller":seller.serialize()})
            else:
                return jsonify({"warning":"Invalid Credentials"}),401
   except Exception as err:
       print(err)
       return jsonify(err.args)




@api.route("/seller/cars", methods=["POST"])
@jwt_required()
def add_cars():
    seller_id = int(get_jwt_identity())

    body_froms = request.form
    body_files = request.files

    model_make_id = body_froms.get("model_make_id", None)
    model_name = body_froms.get("model_name", None)
    model_type = body_froms.get("model_type", None)
    model_year = body_froms.get("model_year", None)
    dealership = body_froms.get("dealership", None) 
    model_body = body_froms.get("model_body", None)
    model_color = body_froms.get("model_color", None)
    model_previous_price = body_froms.get("model_previous_price", None)
    model_price = body_froms.get("model_price", None)
    model_amount = body_froms.get("model_amount", None)
    make_country = body_froms.get("make_country", None)
    model_engine_fuel = body_froms.get("model_engine_fuel", None)
    model_picture = body_files.get("model_picture", None)

    if (
        model_make_id is None
        or model_name is None
        or model_type is None
        or model_year is None
        or model_body is None
        or model_color is None
        or model_amount is None
        or make_country is None
        or model_previous_price is None
        or model_price is None
        or model_engine_fuel is None
        or dealership is None 
    ):
        return jsonify({"warning": "Incomplete Values"}), 400
    else:
        car = Car()

        if model_picture is not None:
            model_picture = uploader.upload(model_picture)
            model_picture = model_picture["secure_url"]
            car.model_picture = model_picture

        car.model_make_id = model_make_id
        car.model_name = model_name
        car.model_type = model_type
        car.model_year = model_year
        car.model_body = model_body
        car.model_color = model_color
        car.model_amount = model_amount
        car.make_country = make_country
        car.model_price = model_price
        car.model_previous_price = model_previous_price
        car.model_engine_fuel = model_engine_fuel
        car.dealership = dealership  
        car.seller_id = seller_id

    try:
        db.session.add(car)
        db.session.commit()

        car_data = {
            "id": car.id,
            "model_make_id": car.model_make_id,
            "model_name": car.model_name,
            "model_type": car.model_type,
            "model_year": car.model_year,
            "model_body": car.model_body,
            "model_color": car.model_color,
            "model_amount": car.model_amount,
            "make_country": car.make_country,
            "model_previous_price": car.model_previous_price,
            "model_price": car.model_price,
            "model_picture": car.model_picture,
            "model_engine_fuel": car.model_engine_fuel,
            "dealership": car.dealership,  
            "seller_id": car.seller_id,
        }

        return jsonify({"car": car_data}), 200

    except Exception as err:
        db.session.rollback()
        print(err.args)
        return jsonify({"Warning": "Error"}), 500

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
        return jsonify({"warning": "Seller Not Found"}), 401

    try:
        car = Car.query.filter_by(id=car_id).one_or_none()
        if car is None:
            return jsonify({"warning": "Car Not Found"}), 404

        body_froms = request.form
        body_files = request.files

        print(body_froms)
       
        car.model_make_id = body_froms.get("model_make_id", car.model_make_id)
        car.model_name = body_froms.get("model_name", car.model_name)
        car.model_type = body_froms.get("model_type", car.model_type)
        car.model_year = body_froms.get("model_year", car.model_year)
        car.model_body = body_froms.get("model_body", car.model_body)
        car.model_color = body_froms.get("model_color", car.model_color)
        car.model_previous_price = body_froms.get("model_previous_price", car.model_previous_price)
        car.model_price = body_froms.get("model_price", car.model_price)
        car.dealership = body_froms.get("dealership", car.dealership)
        car.model_engine_fuel = body_froms.get("model_engine_fuel", car.model_engine_fuel)
        car.make_country = body_froms.get("make_country", car.make_country)
        car.model_amount = body_froms.get("model_amount", car.model_amount)
        model_picture = body_files.get("model_picture")  # Obtener el archivo antes de usarlo

        if model_picture is not None:
            model_picture = uploader.upload(model_picture)
            model_picture = model_picture["secure_url"]
            car.model_picture = model_picture

        db.session.commit()

        return jsonify({"message": "Car Edited"}), 200

    except Exception as err:
        db.session.rollback()
        return jsonify({"error": str(err)}), 500

    
@api.route("/seller/cars/<int:car_id>", methods=["DELETE"])
@jwt_required()
def delete_car(car_id): 

    seller_id=int(get_jwt_identity())
    seller=Seller.query.filter_by(id=seller_id).one_or_none()

    if seller is None:
        return jsonify("This account don't exist"),400
    try:
        car=Car.query.filter_by(id=car_id).one_or_none()
        if car is None:
            return jsonify("This car doesn't exist"),400
        db.session.delete(car)
        db.session.commit()
        return ("Hola"),204
    except Exception as err:
        db.session.rollback()
        return jsonify(err)

@api.route("/send-email",methods=["POST"])
def become_seller():
    try:
        body = request.json
        print(body)
        message=f"""
                    <h1>Welcome to DrivenS</h1>
                    <h5>To start working with us please register in:</h5>
                    <a href="https://ominous-chainsaw-4jg4gvjjjqw625xx7-3000.app.github.dev/register/sellers">To be part of our family register</a>
                 """
        response = send_mail("Invitacion para vendedor",body.get("email"),message)
        print(response)
        return jsonify("Email Sended"),200
    except Exception as err:
     return jsonify(err.args)

















