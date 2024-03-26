from rest_framework import serializers
from .models import SearchEntry
class SearchEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchEntry
        fields = ['user','name', 'description', 'link', 'tags_test','file']