from django.db import models
class SearchEntry(models.Model):
    name = models.CharField(max_length=600)
    description= models.CharField(max_length=500)
    link = models.CharField(max_length=600)

