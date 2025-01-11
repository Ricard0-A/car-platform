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
    password = db.Column(db.String(180), nullable=False)  
    phone_number = db.Column(db.String(15), nullable=False)  
    country = db.Column(db.Enum(Country), nullable=False, default=Country.Other)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password":self.password,
            "phone_number": self.phone_number,
            "country": self.country.value  # Solo devuelve el valor de la enumeración
        }
