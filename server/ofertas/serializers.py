from .models import Offer, Category
from rest_framework import serializers
from django.contrib.auth.models import User



class OfferSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
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
