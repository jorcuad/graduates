from django.db import models

class User(models.Model):
    username = models.CharField(max_length=200)
    email = models.EmailField(max_length=70,blank=True, null= False, unique= True)

    def __str__(self):
        return self.username

class Offer(models.Model):
    ##TODO: buscar problema null
	offerer_name = models.CharField(max_length=200)
	description = models.CharField(max_length=1000,null=True)
	pub_date = models.DateTimeField('date published', null=True)
	email = models.EmailField(max_length=70,blank=True, null= False, unique= True)
	categories = models.CharField(max_length=500,null=True)
	place = models.CharField(max_length=100,null=True)

	class Meta:
		verbose_name = "Offer"
		verbose_name_plural = "Offers"

	def __str__(self):
		return self.description
