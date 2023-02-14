'''
There are two serializer classes: EntrySerializer and EntryFileSerializer. This is to handle
the event that the user makes an entry that includes a link or one that includes a file.
'''
from rest_framework import serializers
from .models import SearchEntry,Tag
class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchEntry
        fields = ['name', 'description', 'link','tag', 'user']

class EntryFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchEntry
        fields = ['name', 'description', 'file','tag', 'user']
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['tag']
       

