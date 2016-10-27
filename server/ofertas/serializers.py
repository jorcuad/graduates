from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class UserOfferSerializer(serializers.ModelSerializer):
    #favorites = OfferSerializer(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class OfferFavsSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Offer

class UserFavsSerializer(serializers.ModelSerializer):
    favorites = OfferFavsSerializer(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email','favorites')



class OfferReadSerializer(serializers.ModelSerializer):
    #favorites = UserSerializer(many=True)
    user = UserOfferSerializer()
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


'''
class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
'''
