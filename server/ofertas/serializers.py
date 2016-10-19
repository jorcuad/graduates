from .models import Offer, Client
from rest_framework import serializers
from django.contrib.auth.models import User
 
from rest_framework import viewsets

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
        instance.offer_name = validated_data.get('offer_name', instance.offer_name)
        instance.description = validated_data.get('description', instance.description)
        instance.pub_date = validated_data.get('pub_date', instance.pub_date)
        instance.activity_date = validated_data.get('activity_date', instance.activity_date)
        instance.categories = validated_data.get('categories', instance.categories)
        instance.place = validated_data.get('place', instance.place)
        instance.save()
        return instance

class ClientSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return Client.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.offerer_name = validated_data.get('offerer_name', instance.offerer_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance
    class Meta:
        model = Client





#class ViewOffer(viewsets.ModelViewSet):
#    serializer_class = OfferSerializer
#    queryset = Offer.objects.all().prefetch_related('client_key')[:10]
