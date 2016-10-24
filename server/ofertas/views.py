from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User, Group
from django.http import HttpResponse

from functools import reduce

from django.db.models import Q

from django.views.decorators.csrf import csrf_exempt

from ofertas.models import Offer, Category
from ofertas.serializers import OfferSerializer, CategorySerializer, UserSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from ofertas.permissions import IsOwnerOrReadOnly



from django.contrib.auth import authenticate, login

class CategoryViewSet(ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly,)


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
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


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


from django.contrib.auth.models import User 
from rest_framework import generics
from ofertas.serializers import UserSerializer

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'OfferSerializer': reverse('offer-list', request=request, format=format)
    })


# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView

# class user_login(APIView):
#     authentication_classes = (SessionAuthentication, BasicAuthentication)
#     permission_classes = (IsAuthenticated,)

#     def get(self, request, format=None):
#         content = {
#             'user': unicode(request.user),  # `django.contrib.auth.User` instance.
#             'auth': unicode(request.auth),  # None
#         }
#         return Response(content)





#@api_view(['POST'])
#def user_login(request):

#    print (request.user)


#    username = request.POST['username']
#    password = request.POST['password']
#    user = authenticate(username=username, password=password)
#    if user is not None:
#        login(request, user)
#        # Redirect to a success page.
#        return render(request, "<body>hola</body>", {})
#
#        print("valid login")            
#    else:
        # Return an 'invalid login' error message.
#        print("invalid login")    
#    return HttpResponse("hola")

