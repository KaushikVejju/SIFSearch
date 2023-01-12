from django.http import JsonResponse
from django.shortcuts import render
from .models import SearchEntry
from .serializers import EntrySerializer,EntryFileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import algoliasearch_django as algoliasearch

def sif_search_home(request):
    return render(request, 'home.html')

# This function is invoked when the user uploads an entry that contains a link.
@api_view(['POST'])
def add_entry_link(request):
    serializer = EntrySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        algoliasearch.reindex_all(SearchEntry,) 
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# This function is invoked when the user uploads an entry that contains a file.
@api_view(['POST'])
def add_entry_file(request):
    serializer = EntryFileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        algoliasearch.reindex_all(SearchEntry,) 
    return Response(serializer.data, status=status.HTTP_201_CREATED)

