from django.conf.urls import url
from ofertas import views

urlpatterns = [
    url(r'^offers/$', views.offer_list),
    url(r'^offers/(?P<id>[0-9]+)/$', views.offer_detail),
    url(r'^offersearch/$', views.offer_search),
]
