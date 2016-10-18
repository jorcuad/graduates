from django.contrib import admin
from .models import *
# Register your models here.

#class AdminUser(admin.ModelAdmin):
#    """docstring for AdminUser."""
#    list_display = ["__str__", "username"]
#    class Meta:
 #       model = User

class AdminOffer(admin.ModelAdmin):
    """docstring for AdminUser."""
    list_display = ["__str__", "offer_name"]
    class Meta:
        model = Offer

#class AdminEmployee(admin.ModelAdmin):
#    """docstring for AdminUser."""
#    list_display = ["__str__", "employee"]
#    class Meta:
#        model = Employee
class OffererInline(admin.StackedInline):
    model = Offerer
    can_delete = False
    verbose_name_plural = 'offerer'


#admin.site.register(User)
admin.site.register(Offerer)
#admin.site.register(User, AdminUser)
admin.site.register(Offer, AdminOffer)
