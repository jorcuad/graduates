from .models import Offer, User
from rest_framework import serializers


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
