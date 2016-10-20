from django.conf.urls import url
from ofertas import views

urlpatterns = [
    url(r'^offersearch/$', views.offer_search)
]
