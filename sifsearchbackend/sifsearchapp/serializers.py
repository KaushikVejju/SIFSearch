from rest_framework import serializers
from .models import SearchEntry
class SearchEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchEntry
        fields = ['name', 'description', 'link', 'tags','file']