from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User



class OfferFavsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer



class UserFavsSerializer(serializers.ModelSerializer):
    favorites = OfferFavsSerializer(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email','favorites')


class UserSerializer(serializers.ModelSerializer):
    #favorites = OfferSerializer(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email','favorites')


class OfferReadSerializer(serializers.ModelSerializer):
    #favorites = UserSerializer(many=True)
    user = UserSerializer()
    class Meta:
        model = Offer

class OfferWriteSerializer(serializers.ModelSerializer):
    #favorites = UserSerializer(many=True)
    #user = UserSerializer()
    class Meta:
        model = Offer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category




class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
