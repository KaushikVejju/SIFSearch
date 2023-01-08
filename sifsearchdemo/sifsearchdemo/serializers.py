# going from a python object to JSON  
from rest_framework import serializers
from .models import SearchEntry
class EntrySerializer(serializers.ModelSerializer):
    # define inner class called meta, which describes the meta data
    # about the model
    class Meta:
        model = SearchEntry
        fields = ['name', 'description', 'link','tag']

class EntryFileSerializer(serializers.ModelSerializer):
    # define inner class called meta, which describes the meta data
    # about the model
    class Meta:
        model = SearchEntry
        fields = ['name', 'description', 'file','tag']
       

