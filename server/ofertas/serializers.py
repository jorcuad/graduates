from .models import Offer, Category
from rest_framework import serializers


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer

    def create(self, validated_data):
        """
        Create and return a new `Offer` instance, given the validated data.
        """
        return Offer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Offer` instance, given the validated data.
        """
        instance.offerer_name = validated_data.get('offerer_name', instance.offerer_name)
        instance.description = validated_data.get('description', instance.description)
        instance.pub_date = validated_data.get('pub_date', instance.pub_date)
        instance.email = validated_data.get('email', instance.email)
        instance.categories = validated_data.get('categories', instance.categories)
        instance.place = validated_data.get('place', instance.place)
        instance.save()
        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
