from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
	#ManyToManyField
	offerer_name = models.OneToOneField(User, on_delete=models.CASCADE)
	email = models.EmailField(max_length=70,blank=True, null= False, unique= True)
	def __str__(self):
		return str(self.offerer_name)
	class Meta:
		verbose_name = "Client"	
		verbose_name_plural = "Clients"

class Offer(models.Model):
	##TODO: buscar problema null
	offer_name = models.CharField(max_length=200)
	description = models.CharField(max_length=1000,null=True)
	pub_date = models.DateTimeField('published_date', null=True)
	activity_date = models.DateTimeField('activity_date', null=True)
	categories = models.CharField(max_length=500,null=True)
	place = models.CharField(max_length=100,null=True)
	client_key = models.ForeignKey(Client, on_delete=models.CASCADE)


	class Meta:
		verbose_name = "Offer"
		verbose_name_plural = "Offers"

	def __str__(self):
		return str(self.offer_name)
		#return "%s (%s)" % (
        #    self.offer_name,
        #    ", ".join(n.offerer_name for n in self.client_key.all()),
        #)



