from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User



class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        depth = 1

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
