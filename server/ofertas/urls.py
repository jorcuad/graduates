from django.conf.urls import url
from ofertas import views
from django.conf.urls import include

urlpatterns = [
    url(r'^offersearch/$', views.offer_search),
   # url(r'^userlogin/', views.user_login)
   url(r'^users/$', views.UserList.as_view()),
	url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),


    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]
