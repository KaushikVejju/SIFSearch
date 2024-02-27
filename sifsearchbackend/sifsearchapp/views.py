from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from rest_framework.decorators import api_view
from .serializers import SearchEntrySerializer
from rest_framework.response import Response
from rest_framework import status
import algoliasearch_django as algoliasearch
from .models import SearchEntry


@api_view(['POST'])
def index(request):
    '''
    TO DO: change the request body so that it seperates the items in the strings

    '''
    serializer = SearchEntrySerializer(data=request.data)
    if serializer.is_valid():
        revised_tag_lst = serializer.validated_data['tags_test'][0].split(",")
        serializer.validated_data['tags_test'] = revised_tag_lst
        serializer.save()

        '''
        in the tags_set, there is one item stored. We need to break this item
        into a list based on the comma. This way we can retrieve the new values
        '''
        for item in serializer.data['tags_test']:
            print(item)
    algoliasearch.reindex_all(SearchEntry,) 
    return Response(serializer.data, status=status.HTTP_201_CREATED)