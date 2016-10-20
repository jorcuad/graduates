from .models import Offer, Category
from rest_framework import serializers


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
