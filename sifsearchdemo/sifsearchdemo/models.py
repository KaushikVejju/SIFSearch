from django.db import models
class SearchEntry(models.Model):
    name = models.CharField(max_length=1000)
    description= models.CharField(max_length=1000)
    link = models.CharField(max_length=1000,default="")
    tag = models.CharField(max_length=1000,default="")
    file = models.FileField(upload_to="static",blank=True)

