from django.db import models
from django.contrib.auth.models import User
import uuid

class Offer(models.Model):
    # TODO: buscar problema null

	offer_name = models.CharField(max_length=200, default="sin título")
	description = models.CharField(max_length=1000, default="sin descricción")
	pub_date = models.DateTimeField(auto_now_add=True, auto_now=False)
	activity_date = models.DateTimeField('activity_date')
	categories = models.CharField(max_length=500, default="otros")
	place = models.CharField(max_length=100, default="sin lugar")
	user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	modified_date =  models.DateTimeField(auto_now_add=False, auto_now=True)
	active = models.BooleanField(default=True)
	private = models.BooleanField(default=False)
	maxContacts = models.IntegerField(default=-1)
	favorites = models.ManyToManyField(User, related_name='favorites', blank=True)
	#favorites = models.ManyToManyField(User, through='Favorite', related_name='favorites')

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


'''
class Favorite(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	offer = models.ForeignKey(Offer, on_delete=models.CASCADE)

	class Meta:
		unique_together = ("user", "offer")
		verbose_name = "Favorite"
		verbose_name_plural = "Favorites"
'''
