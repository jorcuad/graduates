from django.contrib import admin
from .models import *

# Register your models here.

class AdminCategory(admin.ModelAdmin):
    """docstring for AdminCategory."""
    list_display = ["__str__"]
    class Meta:
        model = Category

class AdminOffer(admin.ModelAdmin):
    """docstring for AdminOffer."""
    list_display = ["__str__"]
    class Meta:
        model = Offer

admin.site.register(Category, AdminCategory)
admin.site.register(Offer, AdminOffer)
