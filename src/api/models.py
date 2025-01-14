from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

class Country(Enum):
    USA = "United States"    
    Canada = "Canada"
    Ecuador = "Ecuador"
    Argentina = "Argentina"
    Chile = "Chile"
    Brazil = "Brazil"
    Germany = "Germany"
    Spain = "Spain"
    Japan = "Japan"
    China = "China"
    Other = "Other"

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(90), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180),unique=False, nullable=False)  
    salt = db.Column(db.String(130), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)  
    country = db.Column(db.Enum(Country), nullable=False, default=Country.Other)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone_number": self.phone_number,
            "country": self.country.value 
        }

class Sellers_Country(Enum):
    USA = "United States"    
    Canada = "Canada"
    Ecuador = "Ecuador"
    Argentina = "Argentina"
    Chile = "Chile"
    Brazil = "Brazil"
    Germany = "Germany"
    Spain = "Spain"
    Japan = "Japan"
    China = "China"

class  Seller(db.Model):

    __tablename__="sellers"
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(80), nullable=False, unique=True)
    email=db.Column(db.String(180), nullable=False, unique=True)
    password=db.Column(db.String(180), nullable=False)
    salt=db.Column(db.String(140), nullable=False)
    country=db.Column(db.Enum(Sellers_Country), nullable=False)

    cars = db.relationship("Car", back_populates="sellers")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "country":self.country.value
           
        }

class Car(db.Model):
    __tablename__="cars"
    id =db.Column(db.Integer, primary_key=True)
    model_make_id=db.Column(db.String(80), nullable=False, unique=False)
    model_name=db.Column(db.String(180), nullable=False, unique=False)
    model_trim=db.Column(db.String(180),nullable=False, unique=False)
    model_year=db.Column(db.String(180),nullable=False, unique=False )
    model_body=db.Column(db.String(180), nullable=False, unique=False)
    model_engine_position=db.Column(db.String(180), unique=False)
    model_engine_cc=db.Column(db.String(180), nullable=False, unique=False)
    model_engine_cyl=db.Column(db.String(180), unique=False)
    model_engine_type=db.Column(db.String(180), unique=False)
    model_engine_valves_per_cyl=db.Column(db.String(180), unique=False)
    model_engine_power_ps=db.Column(db.String(180),unique=False)
    model_engine_power_rpm=db.Column(db.String(180), unique=False)
    model_engine_torque_nm=db.Column(db.String(180), unique=False)
    model_engine_torque_rpm=db.Column(db.String(180), unique=False)
    model_engine_bore_mm=db.Column(db.String(180), unique=False)
    model_engine_compression=db.Column(db.String(180), unique=False)
    model_engine_fuel=db.Column(db.String(180), unique=False)
    model_top_speed_kph=db.Column(db.String(180), unique=False)
    model_0_to_100_kph=db.Column(db.String(180), unique=False)
    model_drive=db.Column(db.String(180), unique=False)
    model_transmission_type=db.Column(db.String(180), unique=False)
    model_seats=db.Column(db.String(180), unique=False)
    model_doors=db.Column(db.String(180), unique=False)
    model_weight_kg=db.Column(db.String(180), unique=False)
    model_length_mm=db.Column(db.String(180), unique=False)
    model_width_mm=db.Column(db.String(180), unique=False)
    model_height_mm=db.Column(db.String(180), unique=False)
    model_wheelbase_mm=db.Column(db.String(180), unique=False)
    model_lkm_hwy=db.Column(db.String(180), unique=False)
    model_lkm_mixed=db.Column(db.String(180), unique=False)
    model_lkm_city=db.Column(db.String(180), unique=False)
    model_fuel_cap_l=db.Column(db.String(180), unique=False)
    model_sold_in_us=db.Column(db.String(180), unique=False)
    model_co2=db.Column(db.String(180), unique=False)
    model_make_display=db.Column(db.String(180), unique=False)
    make_display=db.Column(db.String(180), unique=False)
    make_country=db.Column(db.String(180), nullable=False,unique=False )


    seller_id = db.Column(db.Integer, db.ForeignKey("sellers.id"))
    sellers =  db.relationship("Seller",back_populates="cars")
    
    
    def serialize(self):
            return {
                "id": self.id,
                "model_make_id": self.model_make_id,
                "model_name": self.model_name,
                "model_trim": self.model_trim,
                "model_year": self.model_year,
                "model_body": self.model_body,
                "model_engine_position": self.model_engine_position,
                "model_engine_cc": self.model_engine_cc,
                "model_engine_cyl": self.model_engine_cyl,
                "model_engine_type": self.model_engine_type,
                "model_engine_valves_per_cyl": self.model_engine_valves_per_cyl,
                "model_engine_power_ps": self.model_engine_power_ps,
                "model_engine_power_rpm": self.model_engine_power_rpm,
                "model_engine_torque_nm": self.model_engine_torque_nm,
                "model_engine_torque_rpm": self.model_engine_torque_rpm,
                "model_engine_bore_mm": self.model_engine_bore_mm,
                "model_engine_compression": self.model_engine_compression,
                "model_engine_fuel": self.model_engine_fuel,
                "model_top_speed_kph": self.model_top_speed_kph,
                "model_0_to_100_kph": self.model_0_to_100_kph,
                "model_drive": self.model_drive,
                "model_transmission_type": self.model_transmission_type,
                "model_seats": self.model_seats,
                "model_doors": self.model_doors,
                "model_weight_kg": self.model_weight_kg,
                "model_length_mm": self.model_length_mm,
                "model_width_mm": self.model_width_mm,
                "model_height_mm": self.model_height_mm,
                "model_wheelbase_mm": self.model_wheelbase_mm,
                "model_lkm_hwy": self.model_lkm_hwy,
                "model_lkm_mixed": self.model_lkm_mixed,
                "model_lkm_city": self.model_lkm_city,
                "model_fuel_cap_l": self.model_fuel_cap_l,
                "model_sold_in_us": self.model_sold_in_us,
                "model_co2": self.model_co2,
                "model_make_display": self.model_make_display,
                "make_display": self.make_display,
                "make_country": self.make_country
            }

        