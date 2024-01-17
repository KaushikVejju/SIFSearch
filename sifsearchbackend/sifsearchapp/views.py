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
    serializer = SearchEntrySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    algoliasearch.reindex_all(SearchEntry,) 
    return Response(serializer.data, status=status.HTTP_201_CREATED)