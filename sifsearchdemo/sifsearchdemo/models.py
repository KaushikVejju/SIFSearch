'''
SearchEntry model, which includes 5 fields: name, description, link,
tag,and file. There are two serializers for this model.
'''
from django.db import models
class SearchEntry(models.Model):
    name = models.CharField(max_length=1000)
    description= models.CharField(max_length=1000)
    link = models.CharField(max_length=1000,default="")
    tag = models.CharField(max_length=1000,default="")
    file = models.FileField(upload_to="static",blank=True)
    file_name = models.CharField(max_length=1000, default="")


class NotebookEntry(models.Model):
    name = models.CharField(max_length=1000)
    description= models.CharField(max_length=1000)
    tag = models.CharField(max_length=1000, default="")
    file = models.FileField(upload_to="static", blank=True)


class CodeBlockEntry(models.Model):
    code = models.CharField(max_length=1000000)
    explanation = models.CharField(max_length=10000)
    notebook = models.CharField(max_length=10000) #TODO: make this a foreign key field





''' 
Define a tag model to account for tags that the user adds,
instead of the default ones in place.
'''
class Tag(models.Model):
    tag = models.CharField(max_length=60)