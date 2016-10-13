from django.contrib import admin
from .models import *

# Register your models here.

class AdminUser(admin.ModelAdmin):
    """docstring for AdminUser."""
    list_display = ["__str__", "username"]
    class Meta:
        model = User

class AdminOffer(admin.ModelAdmin):
    """docstring for AdminUser."""
    list_display = ["__str__", "offerer_name"]
    class Meta:
        model = Offer

admin.site.register(User, AdminUser)
admin.site.register(Offer, AdminOffer)
