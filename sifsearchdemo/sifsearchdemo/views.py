from django.http import JsonResponse
from django.shortcuts import render
from .models import SearchEntry
from .serializers import EntrySerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import algoliasearch_django as algoliasearch

def sif_search_home(request):
    return render(request, 'home.html')


# defining the api endpoints
@api_view(['POST'])


def add_entry(request):
    serializer = EntrySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        algoliasearch.reindex_all(SearchEntry,) # updates algolia with the new entry that we have added in
    return Response(serializer.data, status=status.HTTP_201_CREATED)

