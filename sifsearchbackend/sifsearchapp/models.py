from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

from django.db import models

def upload_to(instance, filename):
    return 'files/{filename}'.format(filename=filename)
class SearchEntry(models.Model):
    user = models.CharField(max_length=100, default="")
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    link = models.CharField(max_length=1000, default="")    
    tags_test= ArrayField(models.CharField(max_length=100, default=""), default='list')
    file = models.FileField(upload_to=upload_to,default="")