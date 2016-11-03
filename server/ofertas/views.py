from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet, GenericViewSet
from django.core.mail import send_mail
from django.contrib.auth.models import User, Group
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from django.core.exceptions import FieldError
from functools import reduce
from datetime import datetime, timedelta
from django.db.models import Q

from django.views.decorators.csrf import csrf_exempt

from ofertas.models import *
from ofertas.serializers import *

from rest_framework import status, mixins
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response

from django.http import Http404
from rest_framework.views import APIView


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
    #authentication_classes = (JSONWebTokenAuthentication, )
    #permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

class OfferReadViewSet(ReadOnlyModelViewSet):
    """
    API endpoint that allows offers to be viewed or edited.
    """
    queryset = Offer.objects.all()
    serializer_class = OfferReadSerializer

class OfferWriteViewSet(mixins.CreateModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin, GenericViewSet):

    """
    API endpoint that allows offers to be edited.
    """

    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)
    queryset = Offer.objects.all()
    serializer_class = OfferWriteSerializer

class FavsByUserViewSet(mixins.RetrieveModelMixin,
                           mixins.ListModelMixin,
                           GenericViewSet):
    """
    API endpoint that allows offers to be viewed or retrieve.
    """
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserFavsSerializer




class SendEmail(APIView):

    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get_offer(self, pk):
        try:
            return Offer.objects.get(pk=pk)
        except Offer.DoesNotExist:
            raise Http404

    def post(self, request, format=None):
        send_email = SendEmailSerializer(data=request.data)

        if send_email.is_valid():
            offer = self.get_offer(send_email.data["offer"])
            sender_user = UserOfferSerializer(request.user)

            message_user = send_email.data["message"]

            email_sender = sender_user.data["email"]
            sender_username = sender_user.data["username"]

            email_receiver = offer.user.email
            offer_name = offer.offer_name
            offer_description = offer.description
            offer_category = offer.categories
            offer_user= offer.user.username
            offer_date= str(offer.activity_date)

            # email al demandante
            subject_demand = "Se ha contactado con el creador de la oferta"
            message_demand = ('Has contactado con el usuario usuario ' + offer_user + ' sobre la oferta ' + offer_name +
                        ': \n' +
                        'Descripción: ' + offer_description +'\n'+
                        'Fecha: '+ offer_date+ '\n'+
                        'Categoria: ' + offer_category +'\n'+
                        '\n\n Será contestado por el creador en cuanto pueda.\n Muchas gracias, un saludo.\n')

            # email al ofertante
            subject = "Un usuario quiere ponerse en contacto contigo"
            message = ('El usuario ' + sender_username + ' le ha enviado un mensaje ' +
                        ' en relación a la oferta con título "' + offer_name +
                        '". \nPara contestar envie un email a: ' + email_sender +
                        '\n\nMENSAJE:\n' + message_user)
            if offer.maxContacts > 0 or offer.maxContacts == -1:
                send_mail(subject, message, email_sender, [email_receiver], fail_silently=False)
                send_mail(subject_demand, message_demand, email_sender, [email_sender], fail_silently=False)

                if offer.maxContacts > 0:
                    offer.maxContacts -= 1
                    offer.save()
                return Response(status=status.HTTP_200_OK)
            else :
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class FavsEdit(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    def get_offer(self, pk):
        try:
            return Offer.objects.get(pk=pk)
        except Offer.DoesNotExist:
            raise Http404

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, id_user, id_offer, format=None):
        print("get")
        user = self.get_user(id_user)
        offer = self.get_offer(id_offer)
        user.favorites.add(offer)
        print(user, offer)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, id_user, id_offer, format=None):
        print("delete")
        user = self.get_user(id_user)
        offer = self.get_offer(id_offer)
        user.favorites.remove(offer)
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def offer_search(request):
    """
    List all snippets, or create a new snippet.
    """

    search = request.GET.get('search', None)
    categories = request.GET.get('category', None)
    gt = request.GET.get('gt', None)
    lt = request.GET.get('lt', None)
    sort = request.GET.get('sort', None)

    qFilter = Q()
    if search:
        # description or offer_name contains search
        # split the search in words, then remove the
        # words with len < 4
        words = search.split()
        words = [x for x in words if len(x) > 2]
        if words:
            # create the q filter for unorder items for description field
            qDescFilter = reduce(lambda x, y: x & y, [Q(description__icontains=word) for word in words])
            # same with offer_name field
            qNameFilter = reduce(lambda x, y: x & y, [Q(offer_name__icontains=word) for word in words])

            qFilter.add( qDescFilter | qNameFilter, Q.AND)

    if categories:
        # categories equals categories
        # qFilter.add( Q(categories__iexact=categories), Q.AND)
        arrayCategories = categories.split()
        qCateFilter = reduce(lambda x, y: x & y, [Q(categories__icontains=cat) for cat in arrayCategories])
        qFilter.add(qCateFilter, Q.AND)

    # solo mostrar activas y no privadas
    qFilter.add(Q(active=True), Q.AND)
    qFilter.add(Q(public=True), Q.AND)

    results = Offer.objects.filter(qFilter)

    today = datetime.now()
    try:
        if gt:
            if gt == "today":
                results = results.filter(activity_date__gte=today)
            else:
                date = datetime.strptime(gt,'%m/%d/%Y')
                results = results.filter(activity_date__gte=date)
                print(date)
    except:
        print("formato fecha gt erroneo")

    try:
        if lt:
            if lt == "today":
                results = results.filter(activity_date__lte=today)
            else:
                date = datetime.strptime(lt,'%m/%d/%Y') + timedelta(days=1)
                print(date)
                results = results.filter(activity_date__lte=date)
    except:
        print("formato fecha lt erroneo")

    try:
        Offer._meta.get_field(sort)
    except:
        sort = 'activity_date'

    results = results.order_by('-'+sort)

    serializer = OfferReadSerializer(results, many=True)
    return Response(serializer.data)


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
