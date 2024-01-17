from django.db import models

# Create your models here.
from django.db import models

def upload_to(instance, filename):
    return 'files/{filename}'.format(filename=filename)
class SearchEntry(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    link = models.CharField(max_length=1000, default="")    
    tags = models.CharField(max_length=100, default="")
    file = models.FileField(upload_to=upload_to,default="")