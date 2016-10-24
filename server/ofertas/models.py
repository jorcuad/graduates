from django.db import models
from django.contrib.auth.models import User

class Offer(models.Model):
    # TODO: buscar problema null

	offer_name = models.CharField(max_length=200, null=True)
	description = models.CharField(max_length=1000,null=True)
	pub_date = models.DateTimeField(auto_now_add=True, auto_now=False, null = True)
	activity_date = models.DateTimeField('activity_date', null=True)
	categories = models.CharField(max_length=500,null=True)
	place = models.CharField(max_length=100,null=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	modified_date =  models.DateTimeField(auto_now_add=False, auto_now=True, null = True)
	active = models.BooleanField(default=True)
	private = models.BooleanField(default=False)

	class Meta:
		verbose_name = "Offer"
		verbose_name_plural = "Offers"

	def __str__(self):
		return self.description

class Category(models.Model):
    category_name = models.CharField(max_length=200)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.category_name
