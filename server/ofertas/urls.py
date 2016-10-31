from django.conf.urls import url
from ofertas import views

urlpatterns = [
    url(r'^offersearch/$', views.offer_search),
    url(r'^favs_edit/(?P<id_user>[0-9]+)/(?P<id_offer>[0-9]+)/$', views.FavsEdit.as_view()),
]
