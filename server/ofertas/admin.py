from django.contrib import admin
from .models import *
# Register your models here.

class AdminOffer(admin.ModelAdmin):
    """docstring for AdminUser."""
    list_display = ["__str__", "offer_name"]
    class Meta:
        model = Offer

class OffererInline(admin.StackedInline):
    model = Client
    can_delete = False
    verbose_name_plural = 'Clients'


admin.site.register(Client)
admin.site.register(Offer, AdminOffer)
