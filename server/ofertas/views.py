from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User, Group

from functools import reduce

from django.db.models import Q

from django.views.decorators.csrf import csrf_exempt

from ofertas.models import *
from ofertas.serializers import *

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


class CategoryViewSet(ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class UserViewSet(ModelViewSet):
    """
    API endpoint that allows clients to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class OfferViewSet(ModelViewSet):
    """
    API endpoint that allows offers to be viewed or edited.
    """
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

class FavoriteViewSet(ModelViewSet):
    """
    API endpoint that allows offers to be viewed or edited.
    """
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer



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
        qNameFilter = reduce(lambda x, y: x & y, [Q(offer_name__icontains=word) for word in words])

        qFilter.add( qDescFilter | qNameFilter, Q.AND)

    if categories:
        # categories equals categories
        qFilter.add( Q(categories=categories), Q.AND)

    results = Offer.objects.filter(qFilter).order_by('pub_date')
    serializer = OfferSerializer(results, many=True)
    return Response(serializer.data)
