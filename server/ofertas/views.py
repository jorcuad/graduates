from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User, Group

from functools import reduce

from django.db.models import Q

from django.views.decorators.csrf import csrf_exempt

from ofertas.models import Offer, Category
from ofertas.serializers import OfferSerializer, CategorySerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


class CategoryViewSet(ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@api_view(['GET'])
def offer_search(request):
    """
    List all snippets, or create a new snippet.
    """

    search = request.GET.get('search', None)
    categories = request.GET.get('category', None)

    qFilter = Q()
    if(search):
        # description or offer_name contains search
        # split the search in words, then remove the
        # words with len < 4
        words = search.split()
        words = [x for x in words if len(x) > 3]

        # create the q filter for unorder items for description field
        qDescFilter = reduce(lambda x, y: x & y, [Q(description__icontains=word) for word in words])
        # same with offer_name field
        qNameFilter = reduce(lambda x, y: x & y, [Q(description__icontains=word) for word in words])

        # qFilter.add( qDescFilter | qNameFilter, Q.AND)
        qFilter.add( qDescFilter, Q.AND)

    if categories:
        # categories equals categories
        qFilter.add( Q(categories=categories), Q.AND)

    results = Offer.objects.filter(qFilter).order_by('pub_date')
    serializer = OfferSerializer(results, many=True)
    return Response(serializer.data)



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
