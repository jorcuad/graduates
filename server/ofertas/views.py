from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User, Group

from django.views.decorators.csrf import csrf_exempt

from ofertas.models import Offer, Client
from ofertas.serializers import OfferSerializer, ClientSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

###############
#OFFER HANDLER
###############
@api_view(['GET', 'POST'])
def offer_list(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        offers = Offer.objects.all()
        serializer = OfferSerializer(offers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OfferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def offer_detail(request, id):
    """
    Retrieve, update or delete an offer.
    """
    try:
        offer = Offer.objects.get(id=id)
    except Offer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = OfferSerializer(offer)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = OfferSerializer(offer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        offer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#################
#CLIENT HANDLER
#################
@api_view(['POST'])
def new_client(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'POST':
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def client_detail(request, id):
    """
    Retrieve, update or delete an offer.
    """
    try:
    	client = Client.objects.get(id=id)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ClientSerializer(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)